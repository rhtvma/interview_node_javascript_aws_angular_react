const { pipeline } = require('node:stream/promises');
const fs = require('node:fs');
const zlib = require('node:zlib');

async function run() {
    await pipeline(
        fs.createReadStream("./extras/aTextFile.txt"),
        zlib.createGzip(),
        fs.createWriteStream("./extras/zip/aTextFile.gz"),
    );
    console.log('Pipeline succeeded.');
}

run().catch(console.error);
