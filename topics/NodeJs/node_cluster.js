/**

Clustering in Node.js refers to a technique that allows a Node.js application to utilize multiple CPU cores by spawning multiple worker processes. 
Since Node.js is inherently single-threaded, a single instance of a Node.js application can only utilize one CPU core. 
Clustering overcomes this limitation, enabling better performance and scalability on multi-core systems.

How Node.js Clustering Works:
-----------------------------

Master Process: 
---------------
A master process is responsible for managing the worker processes. 
It typically does not execute the application's core logic but rather handles tasks like spawning workers, 
listening for events from workers, and restarting crashed workers.

Worker Processes: 
-----------------
These are independent Node.js instances that run the actual application code. 
Each worker process operates in its own event loop and memory space, allowing them to handle requests concurrently.

Shared Port: 
------------
All worker processes can share the same server port. 
The master process typically acts as a load balancer, distributing incoming connections among the available worker processes, often using a round-robin approach.

 */

const cluster = require("cluster")
const express = require("express")
const os = require("os")
const process = require("process")

const noCPUs = os.availableParallelism()
// console.log(`YOUR SYSTEM HAS ${noCPUs} CPU cores`);

if (cluster.isPrimary) {
    // Keep track of http requests
    let numReqs = 0;

    console.log(`Primary ${process.pid} is running`);
    setInterval(() => {
        console.log(`numReqs = ${numReqs}`);
    }, 3000);

    // Count requests
    function messageHandler(msg) {
        if (msg.cmd && msg.cmd === 'notifyRequest') {
            numReqs += 1;
        }
    }

    //Fork Workers
    for (let i = 0; i < noCPUs; i++) {
        cluster.fork()
    }

    for (const id in cluster.workers) {

        console.log(id)
        cluster.workers[id].on('message', messageHandler);
    }

    cluster.on('exit', (worker, code, signal) => {
        if (signal) {
            console.log(`worker was killed by signal: ${signal}`);
        } else if (code !== 0) {
            console.log(`worker exited with error code: ${code}`);
        } else {
            console.log('worker success!');
        }
    });
} else {
    const app = express()
    const PORT = 3000
    app.get("/", (req, res) => {
        res.send({ "message": `Message from express server ${process.pid}` })
        // Notify primary about the request
        process.send({ cmd: 'notifyRequest' });
    })

    app.listen(PORT, () => {
        console.log(`Server is running @ ${PORT}`)
    })
}


// [nodemon] starting `node server.js`
// Primary 28648 is running
// Server is running @ 3000
// Server is running @ 3000
// Server is running @ 3000
// Server is running @ 3000
// Server is running @ 3000
// Server is running @ 3000
// Server is running @ 3000
// Server is running @ 3000
// numReqs = 2







/**
    const cluster = require('cluster');
    const http = require('http');
    const numCPUs = require('os').cpus().length;

    if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        // Optional: Re-spawn a new worker if needed
        cluster.fork(); 
    });
    } else {
    // Workers can share any TCP connection
    // In this case it is an HTTP server
    http.createServer((req, res) => {
        res.writeHead(200);
        res.end('hello world\n');
    }).listen(8000);

    console.log(`Worker ${process.pid} started`);
    }
 */