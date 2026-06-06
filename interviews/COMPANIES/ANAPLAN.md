# Anaplan Interview Experience - JUNE 2026

This interview focused on React fundamentals, JavaScript/TypeScript decision making, SQL indexing, API design, authentication with JWT, and production deployment using Docker/Kubernetes.

---

## 1. `useState` in React

`useState` is a React Hook used to store and update local component state in functional components.

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount((previousCount) => previousCount + 1)}>
      Count: {count}
    </button>
  );
}
```

### Interview Points

- Updating state triggers a re-render.
- State updates are asynchronous and may be batched.
- Use functional updates when the new value depends on the previous value.
- Keep state minimal and derived values outside state when possible.

---

## 2. `useReducer` in React

`useReducer` is used when state logic becomes complex or when multiple state transitions depend on action types.

```jsx
import { useReducer } from "react";

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return initialState;
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <span>{state.count}</span>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
    </>
  );
}
```

### `useState` vs `useReducer`

| Feature | `useState` | `useReducer` |
| --- | --- | --- |
| Best for | Simple state | Complex state transitions |
| Update style | Direct setter | Action dispatch |
| Logic location | Usually inside component | Reducer function |
| Example | Toggle, input value, counter | Form state, cart, multi-step flow |

---

## 3. `useMemo` / Memoization

`useMemo` memoizes a computed value so React recalculates it only when dependencies change.

```jsx
import { useMemo, useState } from "react";

function ProductList({ products }) {
  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  return (
    <>
      <input value={search} onChange={(event) => setSearch(event.target.value)} />
      {filteredProducts.map((product) => (
        <p key={product.id}>{product.name}</p>
      ))}
    </>
  );
}
```

### Interview Points

- Use `useMemo` for expensive calculations.
- Do not use it everywhere; it has its own overhead.
- It memoizes values, not functions. For functions, use `useCallback`.
- Dependency arrays must be correct, otherwise stale values can appear.

---

## 4. Virtual DOM

The Virtual DOM is an in-memory representation of the real DOM.

### How It Works

1. State or props change.
2. React creates a new Virtual DOM tree.
3. React compares it with the previous tree using reconciliation.
4. React updates only the required parts of the real DOM.

### Simple Interview Answer

The Virtual DOM helps React update the UI efficiently by calculating the minimum required DOM changes instead of directly manipulating the real DOM for every state change.

### Important Point

Virtual DOM does not mean React is always faster than direct DOM updates. It gives React a predictable and efficient way to manage complex UI updates.

---

## 5. Class Components vs Functional Components

| Feature | Class Components | Functional Components |
| --- | --- | --- |
| Syntax | ES6 class | JavaScript function |
| State | `this.state` | `useState`, `useReducer` |
| Lifecycle | `componentDidMount`, `componentDidUpdate`, `componentWillUnmount` | `useEffect` |
| `this` keyword | Required | Not required |
| Reuse logic | HOCs/render props | Custom hooks |
| Modern preference | Legacy support | Preferred in modern React |

### Class Component Example

```jsx
class Counter extends React.Component {
  state = { count: 0 };

  render() {
    return (
      <button onClick={() => this.setState({ count: this.state.count + 1 })}>
        {this.state.count}
      </button>
    );
  }
}
```

### Functional Component Example

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### Which One Should We Use?

Use functional components for new React development because they are simpler, work naturally with hooks, and make logic reuse easier.

---

## 6. TypeScript vs JavaScript

JavaScript is a dynamic scripting language. TypeScript is JavaScript with static typing and additional compile-time checks.

| Feature | JavaScript | TypeScript |
| --- | --- | --- |
| Typing | Dynamic | Static |
| Error detection | Mostly runtime | Compile time + runtime |
| Learning curve | Easier | More setup and type knowledge |
| Refactoring | More risky in large apps | Safer with types |
| Browser execution | Runs directly | Compiles to JavaScript |
| Best for | Small/simple projects, scripts | Large apps, teams, long-term codebases |

### TypeScript Advantages

- Catches many bugs before runtime.
- Better autocomplete and developer experience.
- Safer refactoring.
- Clearer API contracts.
- Better for large teams and complex applications.

### TypeScript Disadvantages

- Extra setup and build step.
- More learning curve.
- Type definitions can become complex.
- Can slow development for very small scripts.

### JavaScript Advantages

- Simple to start.
- No compile step required.
- Huge ecosystem.
- Good for quick prototypes and small scripts.

### JavaScript Disadvantages

- Runtime type errors are easier to miss.
- Refactoring large codebases is harder.
- Function contracts may be unclear without documentation.

### Which One Will You Use and Why?

For production applications, I prefer TypeScript because it improves reliability, maintainability, and team collaboration. For small scripts, quick demos, or interview coding rounds, JavaScript can be faster and simpler.

---

## 7. SQL Indexing

An index is a database structure that improves query speed by helping the database find rows faster without scanning the entire table.

```sql
CREATE INDEX idx_users_email ON users(email);
```

### Advantages

- Faster `SELECT` queries.
- Faster filtering with `WHERE`.
- Faster sorting with `ORDER BY`.
- Faster joins on indexed columns.
- Helps enforce uniqueness with unique indexes.

### Disadvantages

- Slower `INSERT`, `UPDATE`, and `DELETE` because indexes must also be updated.
- Uses extra disk space.
- Too many indexes can confuse query planning and increase maintenance cost.
- Poorly chosen indexes may not be used.

### When to Create Indexes

- Columns used frequently in `WHERE`.
- Columns used in `JOIN`.
- Columns used in `ORDER BY` or `GROUP BY`.
- High-cardinality columns such as email, user ID, or order ID.

### When Indexes May Not Help

- Very small tables.
- Low-cardinality columns such as gender or boolean flags.
- Queries that do not match the index order.
- Columns frequently updated with no read benefit.

---

## 8. How Will You Create APIs?

When creating APIs, I follow a structured approach:

1. Understand business requirements and resources.
2. Design endpoints around nouns, not actions.
3. Use correct HTTP methods.
4. Validate request body, params, and query.
5. Add authentication and authorization.
6. Use consistent response format.
7. Handle errors with proper status codes.
8. Add logging, monitoring, and rate limiting.
9. Write API documentation.
10. Add tests for success, failure, and edge cases.

### Example REST Endpoints

```text
GET    /api/v1/users
GET    /api/v1/users/:id
POST   /api/v1/users
PUT    /api/v1/users/:id
PATCH  /api/v1/users/:id
DELETE /api/v1/users/:id
```

### Important API Practices

- Use `GET` for reading data.
- Use `POST` for creating resources.
- Use `PUT` for full update.
- Use `PATCH` for partial update.
- Use `DELETE` for deletion.
- Never expose sensitive data.
- Use pagination for list APIs.
- Use idempotency keys for payment or retry-sensitive operations.

### Common Status Codes

| Status Code | Meaning |
| --- | --- |
| `200` | Success |
| `201` | Created |
| `204` | Success with no content |
| `400` | Bad request |
| `401` | Not authenticated |
| `403` | Not authorized |
| `404` | Resource not found |
| `409` | Conflict |
| `429` | Too many requests |
| `500` | Server error |

---

## 9. API Versioning

API versioning keeps old clients working while new API changes are introduced.

### Common Versioning Approaches

| Approach | Example |
| --- | --- |
| URI versioning | `/api/v1/users` |
| Header versioning | `X-API-Version: 1` |
| Query versioning | `/api/users?version=1` |

### Which One Will You Use?

I usually use URI versioning like `/api/v1` because it is simple, visible, and easy for frontend and backend teams to understand.

### Interview Tip

Version APIs when introducing breaking changes. Do not create a new version for every small non-breaking change.

---

## 10. JWT and Implementation

JWT stands for JSON Web Token. It is a signed token used to securely transmit claims between client and server.

### JWT Structure

```text
header.payload.signature
```

| Part | Meaning |
| --- | --- |
| Header | Algorithm and token type |
| Payload | Claims such as user ID, role, expiry |
| Signature | Verifies token was not changed |

### How JWT Authentication Works

1. User logs in with credentials.
2. Server validates credentials.
3. Server creates a JWT with user ID, role, and expiry.
4. Client stores token securely.
5. Client sends token in `Authorization` header.
6. Server verifies token on protected routes.

```text
Authorization: Bearer <token>
```

### Node.js Example

```js
const jwt = require("jsonwebtoken");

function createToken(user) {
  return jwt.sign(
    { sub: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );
}

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null;

  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
```

### JWT Best Practices

- Use HTTPS.
- Keep access token expiry short.
- Store secrets in environment variables or secret manager.
- Do not store sensitive data in JWT payload.
- Use refresh tokens carefully.
- Rotate secrets when needed.
- Validate issuer, audience, and expiry for serious production systems.

---

## 11. How Do You Push Changes to Production?

A typical production flow uses Git, CI/CD, Docker, container registry, and Kubernetes.

### Deployment Flow

```text
Developer -> Git commit -> Pull request -> CI tests
          -> Docker build -> Push image to registry
          -> Kubernetes deployment update
          -> Health checks -> Monitoring
```

### Step-by-Step

1. Push code to Git branch.
2. Create pull request.
3. Run CI checks: lint, unit tests, integration tests.
4. Merge after review.
5. Build Docker image.
6. Tag image with version or commit SHA.
7. Push image to registry such as Docker Hub, ECR, GCR, or ACR.
8. Update Kubernetes deployment image.
9. Apply manifests or deploy through Helm.
10. Kubernetes performs rolling update.
11. Verify readiness/liveness probes.
12. Monitor logs, metrics, and errors.
13. Roll back if health checks fail.

### Dockerfile Example

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
```

### Kubernetes Deployment Example

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: node-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: node-api
  template:
    metadata:
      labels:
        app: node-api
    spec:
      containers:
        - name: node-api
          image: registry.example.com/node-api:1.0.0
          ports:
            - containerPort: 3000
          readinessProbe:
            httpGet:
              path: /health
              port: 3000
          livenessProbe:
            httpGet:
              path: /health
              port: 3000
```

### Important Production Practices

- Use environment-specific config.
- Store secrets in Kubernetes Secrets or external secret manager.
- Use rolling deployments.
- Add readiness and liveness probes.
- Use resource requests and limits.
- Keep logs centralized.
- Monitor latency, error rate, CPU, memory, and pod restarts.
- Roll back using previous image or deployment revision if needed.

### Useful Commands

```bash
docker build -t node-api:1.0.0 .
docker tag node-api:1.0.0 registry.example.com/node-api:1.0.0
docker push registry.example.com/node-api:1.0.0

kubectl set image deployment/node-api node-api=registry.example.com/node-api:1.0.0
kubectl rollout status deployment/node-api
kubectl rollout undo deployment/node-api
```

---

## 12. Difference Between Logs, Traces, and Metrics

Logs, traces, and metrics are the three main pillars of observability. They help us understand what is happening inside an application in production.

| Observability Type | What It Tells | Example | Best Used For |
| --- | --- | --- | --- |
| Logs | What happened at a specific point in time | `User login failed for userId=123` | Debugging errors and events |
| Traces | How a request moved across services | API Gateway -> Auth Service -> User Service -> DB | Finding latency and distributed-system issues |
| Metrics | Numeric measurements over time | CPU 80%, error rate 2%, p95 latency 300ms | Monitoring, dashboards, and alerts |

### Logs

Logs are event records generated by an application.

```text
2026-06-06T10:00:00Z ERROR payment_failed orderId=101 reason=card_declined
```

Use logs to debug specific errors, audit important events, and understand what happened before or after a failure.

### Traces

Traces show the full journey of a request across multiple services. A trace is made of spans, where each span represents one operation.

```text
Trace ID: abc123
Span 1: API Gateway - 20ms
Span 2: Auth Service - 35ms
Span 3: Order Service - 120ms
Span 4: Database Query - 90ms
```

Use traces to find where a request became slow or failed in a microservices system.

### Metrics

Metrics are aggregated numeric values collected over time.

Examples:

- Request count.
- Error rate.
- CPU and memory usage.
- API latency.
- Database connection count.
- Queue depth.

Use metrics for dashboards, alerts, SLA/SLO tracking, and capacity planning.

### Simple Interview Answer

Logs tell what happened, traces tell where a request went, and metrics tell how the system is performing over time.

### Practical Example

If an API is slow:

1. Metrics show `p95 latency` increased.
2. Traces show the database span is taking most of the time.
3. Logs show the exact slow query or error message.

---

## Quick Revision

- `useState`: simple local state.
- `useReducer`: complex state transitions.
- `useMemo`: memoized computed value.
- Virtual DOM: efficient UI reconciliation.
- Functional components are preferred in modern React.
- TypeScript is better for large production projects.
- SQL indexes speed reads but slow writes and use storage.
- Good APIs need validation, auth, status codes, docs, tests, logging, and versioning.
- JWT is a signed token used for stateless authentication.
- Production deployment usually flows through CI/CD, Docker image build, registry push, and Kubernetes rollout.
- Logs explain events, traces explain request flow, and metrics explain system health over time.
