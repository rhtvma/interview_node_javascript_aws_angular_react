const fs = require('fs');
const path = require('path');

// Convert snake_case to PascalCase
function toPascalCase(filename) {
    const parts = filename.split('.');
    const nameWithoutExt = parts.slice(0, -1).join('.');
    const ext = parts.length > 1 ? '.' + parts[parts.length - 1] : '';
    
    // Split by underscore and capitalize first letter of each word
    const pascalName = nameWithoutExt
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('_');
    
    return pascalName + ext;
}

// Check if filename needs renaming (has underscore with lowercase first char)
function needsRenaming(filename) {
    if (!filename.includes('_')) return false;
    const firstChar = filename.charAt(0);
    return firstChar === firstChar.toLowerCase() && firstChar !== firstChar.toUpperCase();
}

// Recursively find and rename files
function renameFilesInDirectory(dirPath, dryRun = true) {
    const items = fs.readdirSync(dirPath, { withFileTypes: true });
    const renames = [];
    
    for (const item of items) {
        const fullPath = path.join(dirPath, item.name);
        
        if (item.isDirectory()) {
            // Skip node_modules and .git directories
            if (item.name === 'node_modules' || item.name === '.git' || item.name === '.vscode') {
                continue;
            }
            renames.push(...renameFilesInDirectory(fullPath, dryRun));
        } else if (item.isFile()) {
            if (needsRenaming(item.name)) {
                const newName = toPascalCase(item.name);
                const newPath = path.join(dirPath, newName);
                
                renames.push({
                    oldPath: fullPath,
                    newPath: newPath,
                    oldName: item.name,
                    newName: newName
                });
                
                if (!dryRun) {
                    try {
                        fs.renameSync(fullPath, newPath);
                        console.log(`✓ Renamed: ${fullPath} -> ${newPath}`);
                    } catch (error) {
                        console.error(`✗ Error renaming ${fullPath}:`, error.message);
                    }
                }
            }
        }
    }
    
    return renames;
}

// Main execution
const rootDir = path.join(__dirname, '..');
console.log('Scanning for files to rename...\n');

// Dry run first to show what will be renamed
const filesToRename = renameFilesInDirectory(rootDir, true);

if (filesToRename.length === 0) {
    console.log('No files need renaming.');
} else {
    console.log(`Found ${filesToRename.length} files to rename:\n`);
    filesToRename.forEach(({ oldPath, newName, oldName }) => {
        console.log(`  ${oldPath}`);
        console.log(`    -> ${newName}\n`);
    });
    
    console.log('\n=== DRY RUN COMPLETE ===');
    console.log('To actually rename files, run: node scripts/Rename_Files_Script.js --execute\n');
}

// Check if --execute flag is provided
if (process.argv.includes('--execute')) {
    console.log('\n=== EXECUTING RENAMES ===\n');
    renameFilesInDirectory(rootDir, false);
    console.log('\n=== RENAME COMPLETE ===');
}

