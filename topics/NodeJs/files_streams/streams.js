// Node Streams
const express = require("express")
const app = express()
const PORT = 3000
const fs = require("fs")
const zlib = require("zlib")

const statusMonitor = require('express-status-monitor')();
app.use(statusMonitor);

app.get("/readFile", (req, res) => {
    fs.readFile("./extras/aTextFile.txt", (err, data) => {
        res.json({ data })
    })
})

app.get("/readStream", (req, res) => {
    const stream = fs.createReadStream("./extras/aTextFile.txt", "utf-8")
    let index = 0
    stream.on("data", (chunk) => {
        console.log(`${index++} - Received ${chunk.length} bytes of data.`);
        res.write(chunk)
    })
    stream.on("end", () => {
        console.log(`Finished reading data from file.`);
        res.end()
    })
})

app.get("/createZip", (req, res) => {
    fs.createReadStream("./extras/aTextFile.txt", "utf-8").pipe(zlib.createGzip().pipe(fs.createWriteStream("./extras/aZipFile.zip")))
    res.end()
})

app.listen(PORT, () => {
    console.log(`Server is running @ ${PORT}`)
})


/**
 * 
 * 
 */