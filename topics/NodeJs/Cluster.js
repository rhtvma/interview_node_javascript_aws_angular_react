/**
 * Node.js Cluster + Worker Threads - Interview Ready Example
 *
 * Cluster:
 * - Creates multiple Node.js processes.
 * - Best for scaling HTTP servers across CPU cores.
 * - Each worker process has its own event loop and memory.
 * - Workers can share the same server port through the primary process.
 *
 * Worker Threads:
 * - Creates multiple threads inside a Node.js process.
 * - Best for CPU-heavy work that would block the event loop.
 * - Threads do not replace cluster for HTTP scaling.
 *
 * Simple rule:
 * - Use cluster for more HTTP request concurrency across CPU cores.
 * - Use worker_threads for CPU-intensive tasks inside a process.
 */

"use strict";

const cluster = require("node:cluster");
const express = require("express");
const os = require("node:os");
const process = require("node:process");
const {
  Worker,
  isMainThread,
  parentPort,
  threadId,
  workerData,
} = require("node:worker_threads");

const PORT = Number(process.env.PORT) || 3000;
const CPU_COUNT =
  typeof os.availableParallelism === "function"
    ? os.availableParallelism()
    : os.cpus().length;
const WORKER_COUNT = Number(process.env.WEB_CONCURRENCY) || CPU_COUNT;

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

if (!isMainThread) {
  const input = Number(workerData?.input) || 35;
  const startedAt = Date.now();

  parentPort.postMessage({
    input,
    result: fibonacci(input),
    threadId,
    durationMs: Date.now() - startedAt,
  });
} else if (cluster.isPrimary) {
  startPrimaryProcess();
} else {
  startHttpWorker();
}

function startPrimaryProcess() {
  const requestStats = new Map();

  // Round-robin is the default on most platforms, but setting it makes intent clear.
  if (cluster.SCHED_RR) {
    cluster.schedulingPolicy = cluster.SCHED_RR;
  }

  console.log(`Primary process ${process.pid} is running`);
  console.log(`Starting ${WORKER_COUNT} HTTP workers`);

  for (let i = 0; i < WORKER_COUNT; i++) {
    forkWorker();
  }

  setInterval(() => {
    const totalRequests = [...requestStats.values()].reduce(
      (total, count) => total + count,
      0
    );

    console.log({
      totalRequests,
      perWorker: Object.fromEntries(requestStats),
    });
  }, 10000).unref();

  cluster.on("message", (worker, message) => {
    if (message?.type === "request:handled") {
      const workerPid = worker.process.pid;
      requestStats.set(workerPid, (requestStats.get(workerPid) || 0) + 1);
    }
  });

  cluster.on("exit", (worker, code, signal) => {
    const workerPid = worker.process.pid;
    requestStats.delete(workerPid);

    console.log(
      `Worker ${workerPid} exited. code=${code ?? "none"} signal=${
        signal ?? "none"
      }`
    );

    if (!worker.exitedAfterDisconnect) {
      console.log("Starting a replacement worker");
      forkWorker();
    }
  });

  process.on("SIGINT", shutdownWorkers);
  process.on("SIGTERM", shutdownWorkers);

  function forkWorker() {
    const worker = cluster.fork();

    worker.on("online", () => {
      console.log(`Worker ${worker.process.pid} is online`);
    });

    worker.on("listening", (address) => {
      console.log(
        `Worker ${worker.process.pid} is listening on port ${address.port}`
      );
    });
  }

  function shutdownWorkers() {
    console.log("Primary received shutdown signal. Disconnecting workers...");

    for (const id in cluster.workers) {
      cluster.workers[id]?.disconnect();
    }
  }
}

function startHttpWorker() {
  const app = express();

  app.get("/", (req, res) => {
    notifyPrimaryRequestHandled();

    res.json({
      message: "Handled by clustered Express worker",
      processId: process.pid,
    });
  });

  app.get("/cpu", async (req, res, next) => {
    try {
      notifyPrimaryRequestHandled();

      const input = Math.min(Number(req.query.n) || 35, 45);
      const output = await runCpuTaskInWorkerThread(input);

      res.json({
        message: "CPU-heavy task completed in a worker thread",
        processId: process.pid,
        ...output,
      });
    } catch (error) {
      next(error);
    }
  });

  app.get("/blocking-cpu", (req, res) => {
    notifyPrimaryRequestHandled();

    const input = Math.min(Number(req.query.n) || 35, 45);
    const startedAt = Date.now();

    res.json({
      message: "CPU-heavy task completed on the main event loop",
      warning: "This blocks the worker process while calculating.",
      processId: process.pid,
      input,
      result: fibonacci(input),
      durationMs: Date.now() - startedAt,
    });
  });

  app.listen(PORT, () => {
    console.log(`Worker ${process.pid} started server on port ${PORT}`);
  });
}

function runCpuTaskInWorkerThread(input) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(__filename, {
      workerData: { input },
    });

    worker.once("message", resolve);
    worker.once("error", reject);
    worker.once("exit", (code) => {
      if (code !== 0) {
        reject(new Error(`Worker thread stopped with exit code ${code}`));
      }
    });
  });
}

function notifyPrimaryRequestHandled() {
  if (typeof process.send === "function") {
    process.send({ type: "request:handled" });
  }
}

/**
 * Try:
 *   node topics/NodeJs/Cluster.js
 *
 * Routes:
 *   GET http://localhost:3000/
 *   GET http://localhost:3000/cpu?n=40
 *   GET http://localhost:3000/blocking-cpu?n=40
 *
 * Interview notes:
 * - Cluster gives process-level parallelism.
 * - Worker threads give thread-level parallelism for CPU-heavy work.
 * - I/O work usually does not need worker threads because Node.js already uses
 *   the event loop and libuv thread pool for many async operations.
 * - Worker threads have overhead, so do not create them for every tiny task in
 *   production. Use a worker-thread pool for frequent CPU-heavy jobs.
 */
