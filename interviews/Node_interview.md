# Node.js Interview Questions

## 1. How Do You Improve Node.js Performance?

Node.js performance can be improved by reducing event loop blocking, scaling across CPU cores, optimizing I/O, and monitoring production behavior.

Common approaches:

| Approach               | Explanation                                                         |
| ---------------------- | ------------------------------------------------------------------- |
| Clustering             | Run multiple Node.js processes to use multiple CPU cores            |
| Worker threads         | Move CPU-heavy JavaScript tasks away from the main thread           |
| Caching                | Cache repeated data using memory, Redis, or CDN                     |
| Database optimization  | Use indexes, pagination, query optimization, and connection pooling |
| Async I/O              | Avoid blocking operations like synchronous file system calls        |
| Compression            | Use gzip or Brotli for API responses where useful                   |
| Load balancing         | Distribute requests across multiple app instances                   |
| Logging and monitoring | Track latency, memory, CPU, errors, and event loop lag              |

### Clustering Example

```js
const cluster = require("cluster");
const http = require("http");
const os = require("os");

if (cluster.isPrimary) {
  const cpuCount = os.cpus().length;

  for (let index = 0; index < cpuCount; index += 1) {
    cluster.fork();
  }
} else {
  http
    .createServer((req, res) => {
      res.end(`Handled by process ${process.pid}`);
    })
    .listen(3000);
}
```

### Important Point

Node.js runs JavaScript on a single main thread, but clustering creates multiple Node.js processes. Each process has its own event loop and memory. This allows the application to use multiple CPU cores.

For CPU-heavy work, prefer worker threads or background jobs instead of doing everything on the main event loop.

## 2. How Do You Fix Production Bugs?

A good production bug-fixing process should be systematic and careful because production changes directly affect users.

Recommended flow:

1. Reproduce or understand the issue using logs, monitoring, user reports, and request traces.
2. Check the impact: affected users, frequency, severity, and business impact.
3. Identify the root cause instead of only fixing the visible symptom.
4. Create a minimal and focused fix.
5. Add or update tests to cover the bug.
6. Deploy through the proper release process.
7. Verify the fix in production using logs, metrics, and user flow checks.
8. Add prevention steps such as better validation, alerting, tests, or documentation.

Example answer:

> First, I check logs and monitoring to understand the error and impact. Then I try to reproduce the issue in a lower environment using similar data. Once I identify the root cause, I create a small fix, add a regression test, deploy it safely, and verify production metrics after deployment. Finally, I document the cause and prevention steps so the same bug does not repeat.

Useful tools:

- Application logs.
- Error tracking tools.
- APM tools.
- Database query logs.
- Feature flags.
- Rollback strategy.
- Unit, integration, and regression tests.
