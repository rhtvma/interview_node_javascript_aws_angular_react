// Node Streams
const express = require("express");
const app = express();
const PORT = 3000;
const fs = require("fs");
const zlib = require("zlib");

const statusMonitor = require("express-status-monitor")();
app.use(statusMonitor);

const inputFilePath = "./extras/aTextFile.txt";
const outputZipPath = "./extras/zip/aTextFile.gz";

app.get("/readFile", (req, res) => {
  fs.readFile(inputFilePath, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({ data });
  });
});

app.get("/readStream", (req, res) => {
  const stream = fs.createReadStream(inputFilePath, "utf-8");
  let index = 0;

  stream.on("data", (chunk) => {
    console.log(`${index++} - Received ${chunk.length} bytes of data.`);
    res.write(chunk);
  });

  stream.on("end", () => {
    console.log(`Finished reading data from file.`);
    res.end();
  });

  stream.on("error", (err) => {
    res.status(500).json({ error: err.message });
  });
});

app.get("/createZip", (req, res) => {
  fs.createReadStream(inputFilePath, "utf-8")
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream(outputZipPath))
    .on("finish", () => {
      res.json({ message: "Zip file created", outputZipPath });
    })
    .on("error", (err) => {
      res.status(500).json({ error: err.message });
    });
});

app.listen(PORT, () => {
  console.log(`Server is running @ ${PORT}`);
});

// Interview point:
// readFile loads the full file into memory. createReadStream reads the file in chunks.
