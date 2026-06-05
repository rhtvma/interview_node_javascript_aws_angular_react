# File Streams - Interview Ready Guide

A practical guide to Node.js file streams for reading, writing, transforming, and serving large files efficiently.

---

## Table of Contents

1. [File Stream Overview](#file-stream-overview)
2. [Why File Streams Matter](#why-file-streams-matter)
3. [readFile vs createReadStream](#readfile-vs-createreadstream)
4. [Types of Streams](#types-of-streams)
5. [Readable File Stream](#readable-file-stream)
6. [Writable File Stream](#writable-file-stream)
7. [Pipe](#pipe)
8. [Pipeline](#pipeline)
9. [Backpressure](#backpressure)
10. [Common Events](#common-events)
11. [Best Practices](#best-practices)
12. [Common Interview Questions](#common-interview-questions)

---

## File Stream Overview

**Description:** A file stream processes file data in chunks instead of loading the full file into memory.

**Simple Interview Answer:** File streams are useful when reading or writing large files because they use less memory and start processing data before the whole file is available.

```text
Large file -> chunk -> chunk -> chunk -> destination
```

### Common Use Cases

- Reading large log files.
- Uploading and downloading files.
- Video/audio streaming.
- Compressing files.
- Copying files.
- Processing CSV or JSONL files line by line.

---

## Why File Streams Matter

| Problem | Stream Solution |
| --- | --- |
| Large file consumes too much memory | Read file in chunks |
| User waits until full file is read | Send chunks immediately |
| Need to compress while reading | Pipe through transform stream |
| Need safe error handling across streams | Use `pipeline()` |
| Fast reader overwhelms slow writer | Backpressure controls flow |

---

## readFile vs createReadStream

| Feature | `fs.readFile()` | `fs.createReadStream()` |
| --- | --- | --- |
| Memory | Loads full file into memory | Reads chunks |
| Best For | Small files | Large files |
| Response Time | Waits for full file | Can start immediately |
| Backpressure | Not stream-based | Supported |
| Example | Config file | Video, logs, exports |

### Example

```javascript
const fs = require("node:fs");

fs.readFile("large-file.txt", "utf8", (error, data) => {
  if (error) throw error;
  console.log(data);
});

const stream = fs.createReadStream("large-file.txt", "utf8");

stream.on("data", (chunk) => {
  console.log("chunk size:", chunk.length);
});
```

### Interview Tip

`readFile()` is simpler, but `createReadStream()` is better when file size is large or unknown.

---

## Types of Streams

| Stream Type | Meaning | Example |
| --- | --- | --- |
| Readable | Source of data | `fs.createReadStream()` |
| Writable | Destination for data | `fs.createWriteStream()` |
| Duplex | Readable and writable | TCP socket |
| Transform | Modifies data while passing it through | `zlib.createGzip()` |

```text
Readable -> Transform -> Writable
File     -> Gzip      -> Compressed file
```

---

## Readable File Stream

`fs.createReadStream()` creates a readable stream from a file.

```javascript
const fs = require("node:fs");

const readStream = fs.createReadStream("input.txt", {
  encoding: "utf8",
  highWaterMark: 64 * 1024,
});

readStream.on("data", (chunk) => {
  console.log("received:", chunk.length);
});

readStream.on("end", () => {
  console.log("finished reading");
});

readStream.on("error", (error) => {
  console.error("read failed:", error.message);
});
```

### Important Options

| Option | Description |
| --- | --- |
| `encoding` | Converts buffer chunks to strings |
| `highWaterMark` | Internal buffer size |
| `start` | Start byte position |
| `end` | End byte position |
| `flags` | File open mode |

---

## Writable File Stream

`fs.createWriteStream()` creates a writable stream to a file.

```javascript
const fs = require("node:fs");

const writeStream = fs.createWriteStream("output.txt");

writeStream.write("First line\n");
writeStream.write("Second line\n");
writeStream.end("Last line\n");

writeStream.on("finish", () => {
  console.log("finished writing");
});

writeStream.on("error", (error) => {
  console.error("write failed:", error.message);
});
```

### `write()` Return Value

`writeStream.write(chunk)` returns:

- `true` when more data can be written immediately.
- `false` when the internal buffer is full and the producer should wait for `drain`.

---

## Pipe

`pipe()` connects a readable stream to a writable stream.

```javascript
const fs = require("node:fs");

const readStream = fs.createReadStream("input.txt");
const writeStream = fs.createWriteStream("copy.txt");

readStream.pipe(writeStream);
```

### Compression Example

```javascript
const fs = require("node:fs");
const zlib = require("node:zlib");

fs.createReadStream("input.txt")
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream("input.txt.gz"));
```

### Interview Tip

`pipe()` handles data flow and backpressure, but error handling across multiple streams is easier with `pipeline()`.

---

## Pipeline

`pipeline()` is the recommended way to connect multiple streams because it handles cleanup and errors better.

```javascript
const fs = require("node:fs");
const zlib = require("node:zlib");
const { pipeline } = require("node:stream/promises");

async function compressFile() {
  await pipeline(
    fs.createReadStream("input.txt"),
    zlib.createGzip(),
    fs.createWriteStream("input.txt.gz")
  );

  console.log("compression complete");
}

compressFile().catch((error) => {
  console.error("pipeline failed:", error.message);
});
```

### Why Pipeline Is Better

- Propagates errors.
- Destroys streams on failure.
- Works well with async/await.
- Avoids repeated error handlers on every stream.

---

## Backpressure

**Backpressure** happens when the writable destination is slower than the readable source.

Without backpressure, data can build up in memory and cause high memory usage.

```text
Fast readable stream -> slow writable stream
                     -> buffer grows
```

### Manual Backpressure Example

```javascript
const canContinue = writeStream.write(chunk);

if (!canContinue) {
  readStream.pause();

  writeStream.once("drain", () => {
    readStream.resume();
  });
}
```

### Interview Tip

When using `pipe()` or `pipeline()`, Node.js manages backpressure automatically.

---

## Common Events

### Readable Stream Events

| Event | Meaning |
| --- | --- |
| `data` | Chunk is available |
| `end` | No more data |
| `error` | Read failed |
| `close` | Stream resource closed |

### Writable Stream Events

| Event | Meaning |
| --- | --- |
| `drain` | Buffer has space again |
| `finish` | All data flushed after `end()` |
| `error` | Write failed |
| `close` | Stream resource closed |

---

## Best Practices

- Use `readFile()` for small files and `createReadStream()` for large files.
- Prefer `pipeline()` over chained `pipe()` for production workflows.
- Always handle stream errors.
- Use `path.join()` or `path.resolve()` for reliable file paths.
- Avoid loading large files completely into memory.
- Tune `highWaterMark` only when you understand memory and throughput needs.
- Use transform streams for compression, encryption, parsing, or data conversion.
- Be careful with text encodings when chunks can split multi-byte characters.

---

## Common Interview Questions

### 1. What is a file stream in Node.js?

A file stream reads or writes file data in chunks instead of loading the entire file at once.

### 2. Why are streams useful for large files?

They reduce memory usage and allow processing to begin before the full file is read.

### 3. What is the difference between `readFile()` and `createReadStream()`?

`readFile()` loads the whole file into memory. `createReadStream()` reads chunks and is better for large files.

### 4. What is `pipe()`?

`pipe()` connects a readable stream to a writable stream and passes chunks automatically.

### 5. What is `pipeline()`?

`pipeline()` connects streams with better error handling and cleanup. It is safer for production stream chains.

### 6. What is backpressure?

Backpressure is flow control that prevents a fast readable stream from overwhelming a slower writable stream.

### 7. What are the four types of streams?

Readable, Writable, Duplex, and Transform.

### 8. What is `highWaterMark`?

`highWaterMark` controls the internal buffer size before a stream pauses reading or reports that writing should slow down.

