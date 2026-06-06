# API Versioning - Interview Ready Guide

API versioning is the practice of supporting changes in an API without breaking existing clients.

---

## Table of Contents

1. [What Is API Versioning?](#what-is-api-versioning)
2. [Why API Versioning Is Needed](#why-api-versioning-is-needed)
3. [When to Create a New Version](#when-to-create-a-new-version)
4. [Versioning Strategies](#versioning-strategies)
5. [Express Example - URI Versioning](#express-example---uri-versioning)
6. [Express Example - Header Versioning](#express-example---header-versioning)
7. [Best Practices](#best-practices)
8. [Common Interview Questions](#common-interview-questions)

---

## What Is API Versioning?

**Description:** API versioning allows multiple versions of an API to exist at the same time, so old clients continue working while new clients use newer behavior.

**Simple Interview Answer:** API versioning is used to introduce breaking API changes safely. For example, `/api/v1/users` can keep the old response format while `/api/v2/users` returns a new response format.

---

## Why API Versioning Is Needed

Without versioning, changing an API response can break mobile apps, frontend apps, third-party integrations, and older services.

### Example Breaking Change

Old response:

```json
{
  "name": "Rohit Verma"
}
```

New response:

```json
{
  "firstName": "Rohit",
  "lastName": "Verma"
}
```

If old clients expect `name`, they may fail. A new API version prevents that break.

---

## When to Create a New Version

Create a new API version for breaking changes such as:

- Removing a field.
- Renaming a field.
- Changing field type.
- Changing response structure.
- Changing authentication behavior.
- Changing endpoint behavior in a way old clients cannot handle.

Do not create a new version for non-breaking changes such as:

- Adding an optional response field.
- Adding a new endpoint.
- Improving performance.
- Fixing a bug while keeping the same contract.

---

## Versioning Strategies

| Strategy | Example | Pros | Cons |
| --- | --- | --- | --- |
| URI/path versioning | `/api/v1/users` | Simple, visible, easy to test | Version appears in URL |
| Header versioning | `X-API-Version: 1` | Cleaner URLs | Less visible, harder to test manually |
| Accept header versioning | `Accept: application/vnd.app.v1+json` | REST-friendly content negotiation | More complex |
| Query versioning | `/api/users?version=1` | Easy to try | Less common for production APIs |

### Which Strategy Should You Use?

For most backend projects, URI versioning like `/api/v1` is easiest to understand, document, test, and maintain.

---

## Express Example - URI Versioning

```js
const express = require("express");

const app = express();
app.use(express.json());

const v1Router = express.Router();
const v2Router = express.Router();

v1Router.get("/users/:id", (req, res) => {
  res.json({
    id: req.params.id,
    name: "Rohit Verma",
  });
});

v2Router.get("/users/:id", (req, res) => {
  res.json({
    id: req.params.id,
    firstName: "Rohit",
    lastName: "Verma",
    links: {
      self: `/api/v2/users/${req.params.id}`,
    },
  });
});

app.use("/api/v1", v1Router);
app.use("/api/v2", v2Router);

app.listen(3000, () => {
  console.log("API running on port 3000");
});
```

### URLs

```text
GET /api/v1/users/1
GET /api/v2/users/1
```

---

## Express Example - Header Versioning

```js
const express = require("express");

const app = express();

function apiVersion(version) {
  return (req, res, next) => {
    if (req.get("X-API-Version") === version) {
      return next();
    }

    return res.status(404).json({
      message: `API version ${version} not found for this route`,
    });
  };
}

app.get("/api/users/:id", apiVersion("1"), (req, res) => {
  res.json({
    id: req.params.id,
    name: "Rohit Verma",
  });
});

app.listen(3000);
```

Request:

```text
GET /api/users/1
X-API-Version: 1
```

### Interview Tip

Header versioning keeps URLs clean, but path versioning is usually easier for public documentation and debugging.

---

## Best Practices

- Prefer `/api/v1` style versioning for simple REST APIs.
- Version only when the API contract breaks.
- Keep old versions for a deprecation period.
- Document all supported versions.
- Return clear errors for unsupported versions.
- Add tests for each supported API version.
- Do not maintain too many versions forever.
- Track usage of older versions before removing them.
- Communicate deprecation dates to clients.

---

## Common Interview Questions

### 1. What is API versioning?

API versioning is a way to introduce API changes while keeping older clients working.

### 2. Why do we need API versioning?

It prevents breaking existing clients when response formats, request formats, or endpoint behavior changes.

### 3. Which API versioning approach do you prefer?

I usually prefer URI versioning like `/api/v1` because it is simple, visible, easy to test, and easy to document.

### 4. When should we create `/v2`?

Create `/v2` when there is a breaking change, such as renaming fields, removing fields, changing response shape, or changing behavior.

### 5. Is adding a new optional field a breaking change?

Usually no. Adding optional fields is normally backward compatible.

### 6. How do you retire an old API version?

Announce deprecation, track client usage, provide migration docs, give enough time, then remove it after the deadline.

