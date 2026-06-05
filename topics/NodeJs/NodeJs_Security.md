# Node.js Security - Best Practices Guide

A comprehensive guide covering security best practices for Node.js applications in production.

---

## Table of Contents

1. [Never Run Node.js With Root Privileges](#1-never-run-nodejs-with-root-privileges)
2. [Keep Your NPM Libraries Up To Date](#2-keep-your-npm-libraries-up-to-date)
3. [Avoid Using Default Cookie Names](#3-avoid-using-default-cookie-names)
4. [Set the Security HTTP Headers](#4-set-the-security-http-headers)
5. [Implement Rate Limiting](#5-implement-rate-limiting)
6. [Ensure Strong Authentication Policies](#6-ensure-strong-authentication-policies)
7. [Do Not Send Unnecessary Info](#7-do-not-send-unnecessary-info)
8. [Monitor Your Backend](#8-monitor-your-backend)
9. [Adopt an HTTPS-Only Policy](#9-adopt-an-https-only-policy)
10. [Validate User Input](#10-validate-user-input)
11. [Use Security Linters](#11-use-security-linters)
12. [Prevent SQL Injection](#12-prevent-sql-injection)
13. [Limit Request Size](#13-limit-request-size)
14. [Detect Vulnerabilities Through Automated Tools](#14-detect-vulnerabilities-through-automated-tools)
15. [Make It Easy to Report Vulnerabilities](#15-make-it-easy-to-report-vulnerabilities)

---

## 1. Never Run Node.js With Root Privileges

Running Node.js with root privileges is not recommended as it goes against the principle of least privilege. No matter if your backend is on a dedicated server or Docker container, you should always launch it as a non-root user.

### Why It Matters

If you run Node.js with root privileges, any vulnerabilities in your project or its dependencies can potentially be exploited to gain unauthorized access to your system. For example, an attacker could harness them to:
- Execute arbitrary code
- Access sensitive files
- Take control of the entire machine

### Best Practice

Create a dedicated user for running Node.js. This user should have only the permissions required to launch the app. This way, attackers who succeed in compromising your backend will be restricted to that user's privileges, limiting the potential damage they can cause.

---

## 2. Keep Your NPM Libraries Up To Date

NPM libraries make it easier and quicker to build a full-featured Node.js backend. At the same time, they can also introduce security risks into your application. New vulnerabilities are discovered all the time, and it is the maintainers' job to address them and release an updated version of the package.

### Tools for Checking Vulnerabilities

To ensure the NPM libraries you are relying on are secure, you can use:

- **npm audit** - Built-in npm command
- **snyk** - Third-party security tool

These tools analyze your project's dependencies tree and provide insights into any known vulnerabilities.

```bash
# Check for vulnerabilities
npm audit

# Automatically fix vulnerabilities
npm audit fix

# Using Snyk
npx snyk test
```

---

## 3. Avoid Using Default Cookie Names

The cookie names used by your Node.js application can unintentionally reveal the technology stack your backend is based on. That is valuable information that you should always obscure, as attackers can use it against you.

### Why It Matters

By knowing what framework you are using, attackers can exploit specific weaknesses associated with it. They tend to focus on the name of the session cookie.

### Implementation

Protect your app by setting a custom session cookie name with the `express-session` middleware:

```javascript
const express = require('express');
const session = require('express-session');

const app = express();

app.use(session({
  // set a custom name for the session cookie
  name: 'myCustomCookieName', 
  // a secure secret key for session encryption
  secret: 'mySecretKey', 
}));
```

---

## 4. Set the Security HTTP Headers

The default HTTP headers in Express are not very secure. Some headers contain information that should not be publicly exposed (like `X-Powered-By`), while others are missing and should be added to deal with various security-related aspects, including preventing cross-site scripting (XSS) attacks.

### Using Helmet

The `helmet` library takes care of setting the most important security headers based on recommendations from Security Headers.

```javascript
const express = require('express');
const helmet = require('helmet');

const app = express();

// register the helmet middleware
// to set the security headers
app.use(helmet());
```

### Headers Set by Helmet

The `helmet()` middleware automatically:
- Removes unsafe headers
- Adds new security headers:
  - `X-XSS-Protection`
  - `X-Content-Type-Options`
  - `Strict-Transport-Security`
  - `X-Frame-Options`

---

## 5. Implement Rate Limiting

DDoS (Distributed Denial of Service) and brute force are two of the most common web attacks. To mitigate them, you can implement rate limiting.

### What is Rate Limiting?

Rate limiting involves controlling the incoming traffic to your Node.js backend, preventing malicious actors from overwhelming your server with too many requests.

### Implementation

Use the `rate-limiter-flexible` library:

```javascript
const express = require('express');
const { RateLimiterMemory } = require('rate-limiter-flexible');

const app = express();

const rateLimiter = new RateLimiterMemory({
  points: 10, // maximum number of requests allowed
  duration: 1, // time frame in seconds
});

const rateLimiterMiddleware = (req, res, next) => {
  rateLimiter.consume(req.ip)
    .then(() => {
      // request allowed, 
      // proceed with handling the request
      next();
    })
    .catch(() => {
      // request limit exceeded, 
      // respond with an appropriate error message
      res.status(429).send('Too Many Requests');
    });
};

app.use(rateLimiterMiddleware);
```

**How it works:**
1. A rate limiter instance allowing a maximum of 10 requests in 1 second is initialized
2. It analyzes the IP of the incoming request
3. If the rate limit is not exceeded, the request proceeds
4. Otherwise, the request gets blocked with a 429 response

---

## 6. Ensure Strong Authentication Policies

To protect your Node.js application against attacks that exploit user authentication, you need to enforce strong authentication policies.

### Best Practices

1. **Strong Passwords**: Invite users to set strong passwords
2. **Multi-Factor Authentication (MFA)**: Adds an extra layer of security
3. **Single Sign-On (SSO)**: Simplifies authentication and reduces password reuse
4. **Password Hashing**: Use `bcrypt` over Node.js crypto library
5. **Rate Limiting**: Restrict failed login attempts

### Password Hashing Example

```javascript
const bcrypt = require('bcrypt');

// Hash password
const saltRounds = 10;
const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

// Verify password
const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
```

---

## 7. Do Not Send Unnecessary Info

Any information provided to the attacker unintentionally can be used against you. Server responses should contain only what the caller strictly needs.

### Best Practices

1. **Generic Error Messages**: Avoid detailed error messages or stack traces
2. **Production Mode**: Set `NODE_ENV=production` to prevent Express from adding stack traces
3. **Minimal API Responses**: Return only necessary data fields
4. **Avoid Sensitive Information**: Don't expose confidential data in responses

```javascript
// ❌ Bad - Detailed error
res.status(500).json({ 
  error: 'Database connection failed at line 42 in db.js',
  stack: error.stack 
});

// ✅ Good - Generic error
res.status(500).json({ 
  error: 'Internal server error' 
});
```

---

## 8. Monitor Your Backend

Your backend in production may be under attack, and you may not even be aware of it. This is why it's essential to monitor your Node.js application.

### Application Performance Monitoring (APM) Tools

Popular APM tools for Node.js:
- **SigNoz**
- **Sentry**
- **Prometheus**
- **New Relic**
- **Elastic**

### Benefits

- Real-time data collection
- Detection of anomalies or suspicious activity
- Performance metrics
- Error rates tracking
- Resource usage monitoring
- Security-related metrics
- CI/CD pipeline observability

---

## 9. Adopt an HTTPS-Only Policy

By ensuring that your backend is accessible only via HTTPS, you will improve the confidentiality of data exchanged between clients and your Node.js server.

### Why HTTPS?

HTTPS establishes an encrypted channel that safeguards sensitive information like:
- Passwords
- Session tokens
- User data

### HTTPS Cookies

Ensure cookies are marked as `secure` and `httpOnly`:

```javascript
res.cookie('myCookie', 'cookieValue', {
  // create an HTTPS cookie
  secure: true,
  httpOnly: true,
});
```

**Benefits:**
- Unintended parties or scripts cannot access cookies
- Cookies transmitted exclusively over HTTPS connections

---

## 10. Validate User Input

Whenever users have the opportunity to enter inputs, attackers can exploit that to send malicious data to the server. Therefore, validating user input is fundamental for ensuring security and integrity.

### Using express-validator

```javascript
const { body, validationResult } = require('express-validator');

app.post('/user', 
  // Validation rules
  body('email').isEmail(),
  body('password').isLength({ min: 8 }),
  body('age').isInt({ min: 18 }),
  
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    // Process valid data
    res.json({ message: 'User created successfully' });
  }
);
```

---

## 11. Use Security Linters

Security linters analyze your codebase to identify vulnerabilities, unsafe code sections, and best practice violations.

### eslint-plugin-security

One of the most popular is `eslint-plugin-security`, a set of ESLint rules to enforce security development in Node.js.

### Benefits

- Spot and address security issues early
- Reduce risk of introducing vulnerabilities
- Effective when integrated in CI/CD pipeline

```bash
# Install
npm install --save-dev eslint-plugin-security

# Add to .eslintrc
{
  "plugins": ["security"],
  "extends": ["plugin:security/recommended"]
}
```

---

## 12. Prevent SQL Injection

SQL injection is a common security vulnerability that occurs when an attacker can manipulate input data passed into an SQL query.

### Prevention Methods

#### 1. Use Prepared Statements or Parameterized Queries

```javascript
// ❌ Bad - Vulnerable to SQL injection
const query = `SELECT * FROM users WHERE email = '${userEmail}'`;

// ✅ Good - Using parameterized query
const query = 'SELECT * FROM users WHERE email = ?';
db.query(query, [userEmail]);
```

#### 2. Input Sanitization

Validate user input to reject malicious data.

#### 3. Use an ORM

ORM technologies like Sequelize provide built-in protection against SQL injection.

```javascript
// Using Sequelize
const user = await User.findOne({
  where: { email: userEmail }
});
```

---

## 13. Limit Request Size

The default request body size limit in Node.js is 5 MB. To protect your backend from DDoS attacks, it's recommended to reduce that limit.

### Implementation

Use the `body-parser` library:

```javascript
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// set the request size limit to 1 MB
app.use(bodyParser.json({ limit: '1mb' }));
```

**Result:** Requests with a body larger than 1 MB will be blocked immediately, preventing the server from allocating resources to process them.

---

## 14. Detect Vulnerabilities Through Automated Tools

Automated vulnerability scanning tools are valuable resources for identifying security problems in Node.js applications.

### Popular Tools

- **SonarQube**
- **Snyk**
- **npm audit**
- **OWASP Dependency-Check**

### Key Benefits

1. **Early Detection**: Proactively identify security issues before deployment
2. **Increased Coverage**: Perform in-depth scans of all project files
3. **Continuous Monitoring**: Integrate into CI/CD pipeline for ongoing security

```bash
# Using SonarQube
sonar-scanner

# Using Snyk
snyk test
snyk monitor
```

---

## 15. Make It Easy to Report Vulnerabilities

Giving users and security researchers the ability to report vulnerabilities is crucial for maintaining application security.

### security.txt Standard

The `security.txt` is a proposed standard - a simple text file placed at the root of your project that provides information on how to report security vulnerabilities.

### Example security.txt

```text
Contact: security@example.com
Encryption: https://example.com/pgp-key.asc
Preferred-Languages: en
```

### Fields Explained

- **Contact**: Email address for reporting security vulnerabilities
- **Encryption**: Location of the organization's PGP public key for encrypting messages
- **Preferred-Languages**: Languages for communication

### Additional Options

Consider adding a "Report Vulnerability" page on your website with:
- Clear instructions
- Expected response time
- Disclosure policy
- Bug bounty information (if applicable)

---

## Summary Checklist

- [ ] Run Node.js as non-root user
- [ ] Keep NPM dependencies updated
- [ ] Use custom cookie names
- [ ] Implement security headers with Helmet
- [ ] Add rate limiting
- [ ] Enforce strong authentication policies
- [ ] Minimize information in responses
- [ ] Set up backend monitoring
- [ ] Use HTTPS-only policy
- [ ] Validate all user input
- [ ] Use security linters
- [ ] Prevent SQL injection
- [ ] Limit request body size
- [ ] Use automated vulnerability scanners
- [ ] Provide clear vulnerability reporting process

---

**Stay Secure! 🔒**