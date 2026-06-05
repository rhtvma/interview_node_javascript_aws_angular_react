# Package.json Concepts - Interview Ready

## Table of Contents
1. [Introduction to package.json](#introduction-to-packagejson)
2. [Essential Fields](#essential-fields)
3. [Dependencies](#dependencies)
4. [Scripts](#scripts)
5. [Version Management](#version-management)
6. [Package Configuration](#package-configuration)
7. [Publishing Packages](#publishing-packages)
8. [Best Practices](#best-practices)
9. [Common Interview Questions](#common-interview-questions)
10. [Package-lock.json](#package-lockjson)

---

## Introduction to package.json

### What is package.json?
- Manifest file for Node.js projects
- Contains metadata about the project
- Manages project dependencies
- Defines scripts for automation
- Required for npm packages

### Creating package.json
```bash
# Interactive creation
npm init

# Quick creation with defaults
npm init -y

# With specific scope
npm init --scope=@username
```

### Basic Structure
```json
{
  "name": "my-project",
  "version": "1.0.0",
  "description": "A sample Node.js project",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "jest"
  },
  "keywords": ["nodejs", "javascript"],
  "author": "John Doe <john@example.com>",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "jest": "^29.5.0"
  }
}
```

---

## Essential Fields

### name
```json
{
  "name": "my-package"
}
```
**Rules:**
- Must be lowercase
- One word, no spaces
- Hyphens and underscores allowed
- Max 214 characters
- Cannot start with dot or underscore
- No uppercase letters

**Scoped packages:**
```json
{
  "name": "@username/my-package"
}
```

### version
```json
{
  "version": "1.0.0"
}
```
**Semantic Versioning (SemVer):**
- Format: `MAJOR.MINOR.PATCH`
- `MAJOR`: Breaking changes
- `MINOR`: New features (backward compatible)
- `PATCH`: Bug fixes

### description
```json
{
  "description": "A brief description of the project"
}
```
- Helps users understand the package
- Shown in npm search results
- Keep it concise and clear

### main
```json
{
  "main": "index.js"
}
```
- Entry point of the application
- File that gets loaded when package is required
- Default: `index.js`

### keywords
```json
{
  "keywords": ["express", "middleware", "api", "rest"]
}
```
- Array of strings
- Helps with npm search
- Improves discoverability

### author
```json
{
  "author": "John Doe <john@example.com> (https://johndoe.com)"
}
```
**Or object format:**
```json
{
  "author": {
    "name": "John Doe",
    "email": "john@example.com",
    "url": "https://johndoe.com"
  }
}
```

### license
```json
{
  "license": "MIT"
}
```
**Common licenses:**
- `MIT` - Most permissive
- `ISC` - Similar to MIT
- `Apache-2.0` - Patent protection
- `GPL-3.0` - Copyleft
- `UNLICENSED` - Private/proprietary

### repository
```json
{
  "repository": {
    "type": "git",
    "url": "https://github.com/username/repo.git"
  }
}
```
**Shorthand:**
```json
{
  "repository": "github:username/repo"
}
```

### homepage
```json
{
  "homepage": "https://myproject.com"
}
```

### bugs
```json
{
  "bugs": {
    "url": "https://github.com/username/repo/issues",
    "email": "bugs@example.com"
  }
}
```

---

## Dependencies

### dependencies
```json
{
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "~7.0.3",
    "lodash": "4.17.21"
  }
}
```
- Required for production
- Installed with `npm install`

### devDependencies
```json
{
  "devDependencies": {
    "jest": "^29.5.0",
    "eslint": "^8.40.0",
    "nodemon": "^2.0.22"
  }
}
```
- Only needed for development
- Not installed in production
- Install with `npm install --save-dev` or `npm install -D`

### peerDependencies
```json
{
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}
```
- Specifies compatible versions
- Used for plugins/extensions
- Not automatically installed

### optionalDependencies
```json
{
  "optionalDependencies": {
    "fsevents": "^2.3.2"
  }
}
```
- Optional packages
- Installation failure doesn't stop process
- Must handle absence in code

### bundledDependencies
```json
{
  "bundledDependencies": [
    "package1",
    "package2"
  ]
}
```
- Packages bundled when publishing
- Included in tarball

### Version Ranges

#### Exact Version
```json
{
  "express": "4.18.2"
}
```

#### Caret (^) - Compatible Changes
```json
{
  "express": "^4.18.2"
}
```
- Allows: `4.18.2` to `<5.0.0`
- Updates: MINOR and PATCH
- Default for `npm install`

#### Tilde (~) - Patch Updates
```json
{
  "express": "~4.18.2"
}
```
- Allows: `4.18.2` to `<4.19.0`
- Updates: PATCH only

#### Greater Than
```json
{
  "express": ">4.18.0",
  "mongoose": ">=7.0.0"
}
```

#### Less Than
```json
{
  "express": "<5.0.0",
  "mongoose": "<=7.5.0"
}
```

#### Range
```json
{
  "express": ">=4.18.0 <5.0.0"
}
```

#### Wildcard (*)
```json
{
  "express": "4.18.*",
  "mongoose": "7.*"
}
```

#### Latest
```json
{
  "express": "latest"
}
```

#### Git URLs
```json
{
  "my-package": "git+https://github.com/user/repo.git",
  "another-package": "git+ssh://git@github.com:user/repo.git#v1.0.0"
}
```

#### Local Path
```json
{
  "my-local-package": "file:../my-local-package"
}
```

---

## Scripts

### Common Scripts
```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "build": "webpack --mode production",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write .",
    "prepare": "husky install",
    "precommit": "lint-staged",
    "prepublishOnly": "npm test && npm run build"
  }
}
```

### Running Scripts
```bash
# npm run <script-name>
npm run dev
npm run test

# Special scripts (no 'run' needed)
npm start
npm test
npm stop
npm restart
```

### Lifecycle Scripts

#### Pre and Post Hooks
```json
{
  "scripts": {
    "pretest": "echo 'Running before test'",
    "test": "jest",
    "posttest": "echo 'Running after test'",
    
    "prebuild": "npm run clean",
    "build": "webpack",
    "postbuild": "npm run copy-files"
  }
}
```

#### Built-in Lifecycle Scripts
```json
{
  "scripts": {
    "prepare": "Run after install, before publish",
    "prepublish": "Run before publish (deprecated)",
    "prepublishOnly": "Run before publish only",
    "prepack": "Run before tarball is packed",
    "postpack": "Run after tarball is generated",
    "preinstall": "Run before package is installed",
    "install": "Run after package is installed",
    "postinstall": "Run after package is installed",
    "preuninstall": "Run before package is uninstalled",
    "uninstall": "Run during uninstall",
    "postuninstall": "Run after package is uninstalled",
    "preversion": "Run before version bump",
    "version": "Run after version bump",
    "postversion": "Run after version bump"
  }
}
```

### Passing Arguments
```bash
# Pass arguments with --
npm run test -- --watch
npm run build -- --mode=production
```

### Environment Variables
```json
{
  "scripts": {
    "start": "NODE_ENV=production node index.js",
    "dev": "NODE_ENV=development nodemon index.js"
  }
}
```

**Cross-platform (using cross-env):**
```json
{
  "scripts": {
    "start": "cross-env NODE_ENV=production node index.js"
  },
  "devDependencies": {
    "cross-env": "^7.0.3"
  }
}
```

### Chaining Scripts
```json
{
  "scripts": {
    "clean": "rm -rf dist",
    "build:js": "webpack",
    "build:css": "sass styles.scss dist/styles.css",
    "build": "npm run clean && npm run build:js && npm run build:css",
    "build:parallel": "npm run build:js & npm run build:css"
  }
}
```

---

## Version Management

### Updating Version
```bash
# Patch: 1.0.0 -> 1.0.1
npm version patch

# Minor: 1.0.0 -> 1.1.0
npm version minor

# Major: 1.0.0 -> 2.0.0
npm version major

# Specific version
npm version 1.2.3

# Prerelease
npm version prerelease
# 1.0.0 -> 1.0.1-0

# With message
npm version patch -m "Upgrade to %s"
```

### Version Tags
```json
{
  "version": "1.0.0-alpha.1",
  "version": "1.0.0-beta.2",
  "version": "1.0.0-rc.1"
}
```

---

## Package Configuration

### engines
```json
{
  "engines": {
    "node": ">=14.0.0",
    "npm": ">=6.0.0"
  }
}
```
- Specifies compatible Node.js/npm versions
- Enforced with `engine-strict=true` in `.npmrc`

### os
```json
{
  "os": ["darwin", "linux"],
  "os": ["!win32"]
}
```
- Specify compatible operating systems
- Use `!` to blacklist

### cpu
```json
{
  "cpu": ["x64", "arm64"],
  "cpu": ["!ia32"]
}
```

### private
```json
{
  "private": true
}
```
- Prevents accidental publishing
- Good for internal projects

### type
```json
{
  "type": "module"
}
```
- `"module"`: Use ES modules (import/export)
- `"commonjs"`: Use CommonJS (require/module.exports) - default

### exports
```json
{
  "exports": {
    ".": "./index.js",
    "./utils": "./src/utils.js",
    "./package.json": "./package.json"
  }
}
```
- Define entry points
- Better than `main` for packages

### bin
```json
{
  "bin": {
    "my-cli": "./bin/cli.js"
  }
}
```
**Or single executable:**
```json
{
  "name": "my-cli",
  "bin": "./bin/cli.js"
}
```

### files
```json
{
  "files": [
    "dist",
    "lib",
    "README.md",
    "LICENSE"
  ]
}
```
- Whitelist files to include when publishing
- Always included: `package.json`, `README`, `LICENSE`, `main` file

### config
```json
{
  "config": {
    "port": 3000,
    "timeout": 5000
  }
}
```
- Configuration parameters
- Accessible via `process.env.npm_package_config_port`

### browserslist
```json
{
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not dead"
  ]
}
```
- Target browsers for build tools
- Used by Babel, Autoprefixer, etc.

---

## Publishing Packages

### Preparing for Publish
```json
{
  "name": "@username/my-package",
  "version": "1.0.0",
  "description": "My awesome package",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "files": [
    "dist",
    "README.md"
  ],
  "scripts": {
    "prepublishOnly": "npm test && npm run build"
  },
  "keywords": ["awesome", "package"],
  "author": "Your Name",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/username/my-package.git"
  }
}
```

### Publishing Commands
```bash
# Login to npm
npm login

# Publish package
npm publish

# Publish scoped package (public)
npm publish --access public

# Publish with tag
npm publish --tag beta

# Dry run (see what would be published)
npm publish --dry-run

# Unpublish (within 72 hours)
npm unpublish package-name@version
```

### .npmignore
```
# Ignore files when publishing
node_modules/
src/
tests/
.env
.git
.gitignore
*.test.js
coverage/
```

---

## Best Practices

### 1. Use Exact Versions for Critical Dependencies
```json
{
  "dependencies": {
    "critical-package": "1.2.3"
  }
}
```

### 2. Separate Dev and Production Dependencies
```json
{
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "jest": "^29.5.0",
    "nodemon": "^2.0.22"
  }
}
```

### 3. Use Scripts for Common Tasks
```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest",
    "lint": "eslint .",
    "format": "prettier --write ."
  }
}
```

### 4. Specify Engine Requirements
```json
{
  "engines": {
    "node": ">=14.0.0",
    "npm": ">=6.0.0"
  }
}
```

### 5. Include Metadata
```json
{
  "description": "Clear description",
  "keywords": ["relevant", "keywords"],
  "author": "Your Name",
  "license": "MIT",
  "repository": "github:username/repo"
}
```

### 6. Use package-lock.json
- Commit `package-lock.json` to version control
- Ensures consistent installs across environments
- Use `npm ci` in CI/CD pipelines

### 7. Security Audits
```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# Force fix (may break things)
npm audit fix --force
```

### 8. Keep Dependencies Updated
```bash
# Check outdated packages
npm outdated

# Update packages
npm update

# Update to latest (ignoring semver)
npm install package@latest
```

---

## Common Interview Questions

### 1. What is package.json?
A manifest file for Node.js projects that contains metadata, dependencies, scripts, and configuration.

### 2. What's the difference between dependencies and devDependencies?
- **dependencies**: Required for production
- **devDependencies**: Only needed for development (testing, building, etc.)

### 3. Explain semantic versioning (SemVer)
Format: `MAJOR.MINOR.PATCH`
- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes

### 4. What does ^ and ~ mean in version numbers?
- **^** (caret): Allows MINOR and PATCH updates (^1.2.3 → >=1.2.3 <2.0.0)
- **~** (tilde): Allows PATCH updates only (~1.2.3 → >=1.2.3 <1.3.0)

### 5. What is package-lock.json?
Automatically generated file that locks exact versions of dependencies and their sub-dependencies for consistent installs.

### 6. What's the difference between npm install and npm ci?
- **npm install**: Installs dependencies, may update package-lock.json
- **npm ci**: Clean install from package-lock.json, faster, used in CI/CD

### 7. How do you run scripts defined in package.json?
```bash
npm run script-name
# Special scripts: npm start, npm test (no 'run' needed)
```

### 8. What are peer dependencies?
Dependencies that your package expects the consumer to provide. Common in plugins/extensions.

### 9. How do you prevent a package from being published?
```json
{
  "private": true
}
```

### 10. What is the purpose of the 'main' field?
Specifies the entry point of the package - the file that gets loaded when the package is required.

---

## Advanced Topics

### Workspaces (Monorepo)
```json
{
  "name": "my-monorepo",
  "private": true,
  "workspaces": [
    "packages/*"
  ]
}
```

### TypeScript Configuration
```json
{
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "prepublishOnly": "npm run build"
  },
  "devDependencies": {
    "typescript": "^5.0.0"
  }
}
```

### ESLint Configuration
```json
{
  "eslintConfig": {
    "extends": ["eslint:recommended"],
    "env": {
      "node": true,
      "es6": true
    }
  }
}
```

### Prettier Configuration
```json
{
  "prettier": {
    "semi": true,
    "singleQuote": true,
    "tabWidth": 2
  }
}
```

### Jest Configuration
```json
{
  "jest": {
    "testEnvironment": "node",
    "coverageDirectory": "coverage",
    "collectCoverageFrom": [
      "src/**/*.js"
    ]
  }
}
```

---

## Useful Commands

```bash
# Initialize package.json
npm init
npm init -y

# Install dependencies
npm install
npm install package-name
npm install package-name@version
npm install --save-dev package-name

# Update packages
npm update
npm update package-name

# Remove packages
npm uninstall package-name

# List installed packages
npm list
npm list --depth=0

# Check outdated packages
npm outdated

# Security audit
npm audit
npm audit fix

# Clean install (CI/CD)
npm ci

# View package info
npm view package-name
npm view package-name versions

# Search packages
npm search keyword

# Run scripts
npm run script-name
npm start
npm test

# Version management
npm version patch
npm version minor
npm version major

# Publishing
npm login
npm publish
npm publish --access public
```

---

## Resources
- [npm Documentation](https://docs.npmjs.com/)
- [package.json Specification](https://docs.npmjs.com/cli/v9/configuring-npm/package-json)
- [Semantic Versioning](https://semver.org/)
- [npm CLI Commands](https://docs.npmjs.com/cli/v9/commands)

---

## Package-lock.json

### What is package-lock.json?
- Automatically generated file by npm
- Locks exact versions of all dependencies and sub-dependencies
- Ensures consistent installs across different environments
- Should be committed to version control

### Purpose
1. **Deterministic Installs**: Same dependency tree every time
2. **Faster Installs**: npm can skip metadata resolution
3. **Security**: Track exact versions for security audits
4. **Collaboration**: Team members get identical dependencies

### Structure
```json
{
  "name": "my-project",
  "version": "1.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "my-project",
      "version": "1.0.0",
      "dependencies": {
        "express": "^4.18.2"
      }
    },
    "node_modules/express": {
      "version": "4.18.2",
      "resolved": "https://registry.npmjs.org/express/-/express-4.18.2.tgz",
      "integrity": "sha512-...",
      "dependencies": {
        "accepts": "~1.3.8",
        "body-parser": "1.20.1"
      }
    }
  }
}
```

### Key Fields

#### lockfileVersion
```json
{
  "lockfileVersion": 3
}
```
- Version 1: npm 5-6
- Version 2: npm 7+ (backward compatible)
- Version 3: npm 7+ (optimized format)

#### packages
```json
{
  "packages": {
    "node_modules/express": {
      "version": "4.18.2",
      "resolved": "https://registry.npmjs.org/express/-/express-4.18.2.tgz",
      "integrity": "sha512-5/PsL6iGPdfQ/lKM1UuielYgv3BUoJfz1aUwU9vHZ+J7gyvwdQXFEBIEIaxeGf0GIcreATNyBExtalisDbuMqQ==",
      "dependencies": {
        "accepts": "~1.3.8"
      },
      "engines": {
        "node": ">= 0.10.0"
      }
    }
  }
}
```

#### resolved
- URL where package was downloaded from
- Ensures same source for future installs

#### integrity
- Cryptographic hash (SHA-512)
- Verifies package hasn't been tampered with
- Format: `sha512-<base64-hash>`

### npm install vs npm ci

#### npm install
```bash
npm install
```
- Installs dependencies from package.json
- May update package-lock.json
- Resolves version ranges
- Slower but flexible
- Use in development

**Behavior:**
1. Reads package.json
2. Resolves version ranges
3. Updates package-lock.json if needed
4. Installs packages

#### npm ci (Clean Install)
```bash
npm ci
```
- Installs from package-lock.json exactly
- Never modifies package-lock.json
- Deletes node_modules first
- Faster and more reliable
- Use in CI/CD pipelines

**Behavior:**
1. Deletes node_modules
2. Reads package-lock.json
3. Installs exact versions
4. Fails if package.json and package-lock.json are out of sync

**Comparison:**

| Feature | npm install | npm ci |
|---------|-------------|--------|
| **Speed** | Slower | Faster |
| **Modifies lock file** | Yes | No |
| **Deletes node_modules** | No | Yes |
| **Uses** | package.json | package-lock.json |
| **Version resolution** | Yes | No |
| **Use case** | Development | CI/CD |

### When package-lock.json is Updated

1. **npm install** (without arguments)
   - Updates if package.json changed
   - Resolves new version ranges

2. **npm install <package>**
   - Adds new package
   - Updates lock file

3. **npm update**
   - Updates packages within semver ranges
   - Updates lock file

4. **npm uninstall <package>**
   - Removes package
   - Updates lock file

### Merge Conflicts

When multiple developers update dependencies:

```bash
# If you get merge conflicts in package-lock.json

# Option 1: Regenerate from package.json
rm package-lock.json
npm install

# Option 2: Use npm to fix
npm install --package-lock-only

# Option 3: Accept one version and reinstall
git checkout --theirs package-lock.json
npm install
```

### Best Practices

#### 1. Always Commit package-lock.json
```bash
git add package-lock.json
git commit -m "Update dependencies"
```

#### 2. Use npm ci in CI/CD
```yaml
# .github/workflows/test.yml
- name: Install dependencies
  run: npm ci
```

#### 3. Don't Manually Edit
- Never manually edit package-lock.json
- Let npm manage it

#### 4. Keep in Sync
```bash
# Check if package.json and package-lock.json are in sync
npm install --package-lock-only
```

#### 5. Resolve Conflicts Properly
```bash
# After resolving package.json conflicts
npm install
```

### Troubleshooting

#### Lock file out of sync
```bash
# Error: package-lock.json out of sync with package.json
npm install --package-lock-only
```

#### Corrupted lock file
```bash
# Delete and regenerate
rm package-lock.json
npm install
```

#### Different npm versions
```bash
# Check npm version
npm --version

# Update npm
npm install -g npm@latest
```

#### Cache issues
```bash
# Clear npm cache
npm cache clean --force

# Reinstall
rm -rf node_modules package-lock.json
npm install
```

### package-lock.json vs yarn.lock vs pnpm-lock.yaml

| Feature | package-lock.json | yarn.lock | pnpm-lock.yaml |
|---------|-------------------|-----------|----------------|
| **Package Manager** | npm | Yarn | pnpm |
| **Format** | JSON | YAML-like | YAML |
| **Size** | Larger | Medium | Smaller |
| **Readability** | Less | More | More |
| **Performance** | Good | Good | Excellent |

### Security Considerations

#### 1. Audit Dependencies
```bash
# Check for vulnerabilities
npm audit

# View detailed report
npm audit --json

# Fix vulnerabilities
npm audit fix
```

#### 2. Verify Integrity
- package-lock.json includes integrity hashes
- npm verifies packages during install
- Prevents tampered packages

#### 3. Review Changes
```bash
# See what changed
git diff package-lock.json

# Review before committing
```

### Advanced Usage

#### Lock File Version
```bash
# Generate specific lock file version
npm install --lockfile-version=2
```

#### Ignore Scripts
```bash
# Install without running scripts (security)
npm ci --ignore-scripts
```

#### Production Only
```bash
# Install only production dependencies
npm ci --production
npm ci --omit=dev
```

#### Offline Install
```bash
# Install from cache only
npm ci --offline
```

### Common Interview Questions

#### 1. What is package-lock.json?
An automatically generated file that locks exact versions of all dependencies and their sub-dependencies to ensure consistent installs.

#### 2. Should package-lock.json be committed to git?
Yes, always commit it to ensure all team members and CI/CD pipelines use the same dependency versions.

#### 3. What's the difference between npm install and npm ci?
- **npm install**: Uses package.json, may update lock file, slower
- **npm ci**: Uses package-lock.json exactly, faster, deletes node_modules first

#### 4. When should you use npm ci?
In CI/CD pipelines, production deployments, and when you want guaranteed reproducible builds.

#### 5. What happens if package.json and package-lock.json are out of sync?
- **npm install**: Updates package-lock.json to match package.json
- **npm ci**: Fails with an error

#### 6. How do you resolve package-lock.json merge conflicts?
Delete the lock file and run `npm install`, or use `npm install --package-lock-only` to regenerate it.

#### 7. What is the integrity field in package-lock.json?
A cryptographic hash (SHA-512) that verifies the package hasn't been tampered with during download.

#### 8. Can you manually edit package-lock.json?
No, you should never manually edit it. Let npm manage it automatically.

#### 9. What does lockfileVersion mean?
Indicates the format version of the lock file, corresponding to different npm versions.

#### 10. How does package-lock.json improve security?
It locks exact versions, includes integrity hashes, and allows for consistent security audits across environments.

---