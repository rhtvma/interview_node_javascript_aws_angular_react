# JWT Token - Usage and Security

JWT stands for JSON Web Token. It is commonly used for stateless authentication and authorization in web APIs.

---

## Table of Contents

1. [What Is JWT?](#what-is-jwt)
2. [JWT Structure](#jwt-structure)
3. [How JWT Authentication Works](#how-jwt-authentication-works)
4. [Access Token vs Refresh Token](#access-token-vs-refresh-token)
5. [Node.js Implementation](#nodejs-implementation)
6. [Authorization with Roles](#authorization-with-roles)
7. [Where to Store JWT](#where-to-store-jwt)
8. [JWT Security Best Practices](#jwt-security-best-practices)
9. [Advantages and Disadvantages](#advantages-and-disadvantages)
10. [Common Interview Questions](#common-interview-questions)

---

## What Is JWT?

**Description:** A JWT is a compact, signed token that carries claims about a user or system.

**Simple Interview Answer:** JWT is used to prove that a user is authenticated. The server signs the token after login, and the client sends it with later requests. The server verifies the signature before allowing access.

---

## JWT Structure

A JWT has three parts:

```text
header.payload.signature
```

| Part | Meaning |
| --- | --- |
| Header | Token type and signing algorithm |
| Payload | Claims such as user ID, role, issuer, expiry |
| Signature | Verifies that the token was not changed |

### Example Payload

```json
{
  "sub": "user_123",
  "role": "admin",
  "iat": 1710000000,
  "exp": 1710000900
}
```

### Important Point

JWT payload is encoded, not encrypted. Anyone who has the token can decode and read the payload. Do not store passwords, card numbers, or secrets inside JWT payload.

---

## How JWT Authentication Works

```text
User login -> Server validates credentials -> Server signs JWT
Client stores JWT -> Client sends JWT in Authorization header
Server verifies JWT -> Protected route is allowed
```

Request header:

```text
Authorization: Bearer <access_token>
```

---

## Access Token vs Refresh Token

| Token | Purpose | Expiry | Storage |
| --- | --- | --- | --- |
| Access token | Access protected APIs | Short expiry, like 5-15 minutes | Memory or secure cookie |
| Refresh token | Get new access token | Longer expiry | HttpOnly secure cookie or server-side store |

### Interview Tip

Use short-lived access tokens. If long sessions are required, use refresh tokens with rotation and revocation.

---

## Node.js Implementation

Install:

```bash
npm install jsonwebtoken bcrypt
```

### Create Token

```js
const jwt = require("jsonwebtoken");

function createAccessToken(user) {
  return jwt.sign(
    {
      sub: user.id,
      role: user.role,
    },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: "15m",
      issuer: "node-api",
      audience: "node-api-client",
    }
  );
}
```

### Verify Token Middleware

```js
const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null;

  if (!token) {
    return res.status(401).json({ message: "Access token missing" });
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_ACCESS_SECRET, {
      issuer: "node-api",
      audience: "node-api-client",
    });

    return next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
```

### Login Route Example

```js
const express = require("express");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());

app.post("/api/v1/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const accessToken = createAccessToken(user);

  return res.status(200).json({
    accessToken,
    tokenType: "Bearer",
    expiresIn: 900,
  });
});
```

`findUserByEmail` is your database function. Store only password hashes, never plain passwords.

---

## Authorization with Roles

Authentication checks who the user is. Authorization checks what the user is allowed to do.

```js
function authorize(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    return next();
  };
}

app.get("/api/v1/admin/reports", authenticate, authorize("admin"), (req, res) => {
  res.json({ message: "Admin report data" });
});
```

---

## Where to Store JWT

| Storage | Pros | Cons |
| --- | --- | --- |
| Memory | Safer from persistent XSS theft | Lost on refresh |
| localStorage | Easy to use | Vulnerable to XSS token theft |
| sessionStorage | Cleared when tab closes | Vulnerable to XSS |
| HttpOnly cookie | JavaScript cannot read it | Needs CSRF protection |

### Practical Choice

For browser apps, HttpOnly secure cookies are often safer for refresh tokens. Access tokens can be kept short-lived. Avoid storing long-lived tokens in `localStorage`.

---

## JWT Security Best Practices

- Always use HTTPS.
- Use strong secrets or asymmetric keys.
- Keep access tokens short-lived.
- Do not store sensitive data in the payload.
- Validate `exp`, `iss`, and `aud`.
- Use refresh token rotation for long sessions.
- Store refresh tokens securely.
- Revoke refresh tokens on logout or suspicious activity.
- Protect cookie-based auth against CSRF.
- Protect all apps against XSS.
- Use `bcrypt` or `argon2` for password hashing.
- Never hardcode JWT secrets in source code.
- Rotate secrets/keys when needed.
- Log authentication failures carefully without leaking sensitive data.

---

## Advantages and Disadvantages

### Advantages

- Stateless access token verification.
- Works well with REST APIs and microservices.
- Compact and easy to pass in headers.
- Can carry useful claims like user ID and role.
- Reduces database lookup for every request when used carefully.

### Disadvantages

- Harder to revoke access tokens before expiry.
- Payload is readable if intercepted.
- Stolen tokens can be used until expiry.
- Large JWTs increase request size.
- Bad storage choices can create XSS or CSRF risks.

---

## Common Interview Questions

### 1. What is JWT?

JWT is a signed token used to transmit claims between client and server, commonly for authentication.

### 2. Is JWT encrypted?

No, normal JWT is signed and base64url encoded, not encrypted. The payload can be decoded, so do not store secrets in it.

### 3. Where do you send JWT in an API request?

Usually in the `Authorization` header as `Bearer <token>`.

### 4. What is the difference between authentication and authorization?

Authentication verifies identity. Authorization verifies permission.

### 5. How do you secure JWT?

Use HTTPS, short expiry, strong secrets, issuer/audience validation, safe storage, refresh token rotation, and avoid sensitive payload data.

### 6. How do you logout with JWT?

For access tokens, let them expire quickly. For refresh tokens, delete/revoke them from the server-side store or token allowlist/denylist.

### 7. What happens if a JWT is stolen?

The attacker can use it until it expires unless the system has revocation logic. That is why short-lived access tokens and secure storage matter.

