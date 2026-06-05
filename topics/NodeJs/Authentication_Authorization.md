# Authentication & Authorization in Node.js

A comprehensive guide to implementing authentication and authorization in Node.js applications.

---

## Table of Contents

1. [What is Authentication?](#what-is-authentication)
2. [What is Authorization?](#what-is-authorization)
3. [Authentication vs Authorization](#authentication-vs-authorization)
4. [Authentication Best Practices](#authentication-best-practices)
5. [Popular Authentication Libraries](#popular-authentication-libraries)
6. [Authorization Best Practices](#authorization-best-practices)
7. [Complete Implementation Example](#complete-implementation-example)

---

## What is Authentication?

**Authentication** is the process of verifying the identity of a user, ensuring they are who they claim to be. This is typically achieved through the use of credentials, such as usernames and passwords.

### Key Concepts

- **Identity Verification**: Confirming user identity
- **Credentials**: Username/password, tokens, biometrics
- **Session Management**: Maintaining user state
- **Security**: Protecting user data and access

### Common Authentication Methods

1. **Username/Password**: Traditional login
2. **Token-Based**: JWT, OAuth tokens
3. **Multi-Factor Authentication (MFA)**: Additional verification layer
4. **Biometric**: Fingerprint, face recognition
5. **Social Login**: Google, Facebook, GitHub
6. **Single Sign-On (SSO)**: One login for multiple services

---

## What is Authorization?

**Authorization** defines what actions a user is allowed to perform after they've been authenticated. It involves granting or denying access to specific resources or functionality.

### Key Concepts

- **Access Control**: Who can access what
- **Permissions**: Specific actions allowed
- **Roles**: Groups of permissions
- **Resources**: Protected data or functionality

### Common Authorization Models

1. **Role-Based Access Control (RBAC)**: Based on user roles
2. **Attribute-Based Access Control (ABAC)**: Based on attributes
3. **Access Control Lists (ACL)**: Specific permissions per resource
4. **Policy-Based**: Rules-based access control

---

## Authentication vs Authorization

| Aspect | Authentication | Authorization |
|--------|---------------|---------------|
| **Question** | Who are you? | What can you do? |
| **Purpose** | Verify identity | Grant permissions |
| **When** | Before authorization | After authentication |
| **Method** | Credentials, tokens | Roles, permissions |
| **Example** | Login with password | Admin can delete users |
| **Failure** | 401 Unauthorized | 403 Forbidden |

### Visual Flow

```
User Login
    ↓
Authentication (Who are you?)
    ↓
[Valid?] → No → 401 Unauthorized
    ↓ Yes
Authorization (What can you do?)
    ↓
[Allowed?] → No → 403 Forbidden
    ↓ Yes
Access Granted
```

---

## Authentication Best Practices

### 1. Use HTTPS

Always use HTTPS to secure data transmission between the client and server, especially when handling login credentials.

```javascript
// Force HTTPS in Express
app.use((req, res, next) => {
  if (req.header('x-forwarded-proto') !== 'https' && process.env.NODE_ENV === 'production') {
    res.redirect(`https://${req.header('host')}${req.url}`);
  } else {
    next();
  }
});
```

---

### 2. Password Hashing

Store passwords securely by hashing and salting them. **Never store plain text passwords!**

#### Using bcrypt

```javascript
const bcrypt = require('bcrypt');

// Hash password during registration
async function registerUser(username, password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  
  // Save to database
  await User.create({
    username,
    password: hashedPassword
  });
}

// Verify password during login
async function loginUser(username, password) {
  const user = await User.findOne({ username });
  
  if (!user) {
    throw new Error('User not found');
  }
  
  const isMatch = await bcrypt.compare(password, user.password);
  
  if (!isMatch) {
    throw new Error('Invalid password');
  }
  
  return user;
}
```

---

### 3. Multi-Factor Authentication (MFA)

Implement MFA to add an extra layer of security. This could involve something the user knows (password) and something they have (e.g., a mobile app token).

```javascript
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');

// Generate MFA secret
function generateMFASecret(username) {
  const secret = speakeasy.generateSecret({
    name: `MyApp (${username})`
  });
  
  return {
    secret: secret.base32,
    qrCode: secret.otpauth_url
  };
}

// Generate QR code for user to scan
async function generateQRCode(otpauthUrl) {
  return await QRCode.toDataURL(otpauthUrl);
}

// Verify MFA token
function verifyMFAToken(secret, token) {
  return speakeasy.totp.verify({
    secret: secret,
    encoding: 'base32',
    token: token,
    window: 2
  });
}

// Usage in login
app.post('/login', async (req, res) => {
  const { username, password, mfaToken } = req.body;
  
  // Verify password
  const user = await loginUser(username, password);
  
  // Verify MFA if enabled
  if (user.mfaEnabled) {
    const isValidToken = verifyMFAToken(user.mfaSecret, mfaToken);
    if (!isValidToken) {
      return res.status(401).json({ error: 'Invalid MFA token' });
    }
  }
  
  // Generate session token
  const token = generateToken(user);
  res.json({ token });
});
```

---

### 4. Session Management

Use secure and random session tokens to manage user sessions.

```javascript
const session = require('express-session');
const MongoStore = require('connect-mongo');

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI
  }),
  cookie: {
    secure: true, // HTTPS only
    httpOnly: true, // Prevent XSS
    maxAge: 1000 * 60 * 60 * 24 // 24 hours
  }
}));
```

---

## Popular Authentication Libraries

### 1. Passport.js

Passport.js is a widely-used authentication library for Node.js. It supports various authentication strategies, including local (username and password), OAuth, and OpenID.

#### Local Strategy Example

```javascript
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

// Configure local strategy
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      // Find user in database
      const user = await User.findOne({ username });
      
      if (!user) {
        return done(null, false, { message: 'Invalid username' });
      }
      
      // Verify password
      const isMatch = await bcrypt.compare(password, user.password);
      
      if (!isMatch) {
        return done(null, false, { message: 'Invalid password' });
      }
      
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Login route
app.post('/login', 
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
  })
);

// Logout route
app.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
});
```

#### OAuth Strategy Example

```javascript
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Find or create user
      let user = await User.findOne({ googleId: profile.id });
      
      if (!user) {
        user = await User.create({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value
        });
      }
      
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

// Routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/dashboard');
  }
);
```

---

### 2. JSON Web Tokens (JWT)

JSON Web Tokens are a popular way to implement stateless authentication and authorization in Node.js. Users receive a token upon login, which they include in subsequent requests.

#### Basic JWT Implementation

```javascript
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Secret key (store in environment variable)
const JWT_SECRET = process.env.JWT_SECRET;

// Register user
app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const user = await User.create({
      username,
      email,
      password: hashedPassword
    });
    
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login and generate token
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Create token
    const token = jwt.sign(
      { 
        userId: user._id,
        username: user.username,
        role: user.role
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({ 
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Middleware to verify token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  
  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    
    req.user = user;
    next();
  });
}

// Protected route
app.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Refresh token
app.post('/refresh-token', authenticateToken, (req, res) => {
  const newToken = jwt.sign(
    { 
      userId: req.user.userId,
      username: req.user.username,
      role: req.user.role
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
  
  res.json({ token: newToken });
});
```

---

## Authorization Best Practices

### 1. Role-Based Access Control (RBAC)

Implement RBAC to assign roles (e.g., admin, user, moderator) to users and restrict access based on their roles.

```javascript
// User model with roles
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ['user', 'moderator', 'admin'],
    default: 'user'
  }
});

// Middleware to check roles
function checkRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    next();
  };
}

// Usage
app.get('/admin/users', 
  authenticateToken, 
  checkRole('admin'), 
  async (req, res) => {
    const users = await User.find();
    res.json(users);
  }
);

app.delete('/admin/users/:id', 
  authenticateToken, 
  checkRole('admin', 'moderator'), 
  async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  }
);
```

---

### 2. Middleware for Authorization

Use middleware functions to check a user's permissions before granting access to a route or resource.

```javascript
// Check if user owns the resource
function checkOwnership(Model) {
  return async (req, res, next) => {
    try {
      const resource = await Model.findById(req.params.id);
      
      if (!resource) {
        return res.status(404).json({ error: 'Resource not found' });
      }
      
      // Check if user is owner or admin
      if (resource.userId.toString() !== req.user.userId && req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Access denied' });
      }
      
      req.resource = resource;
      next();
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  };
}

// Usage
app.put('/posts/:id', 
  authenticateToken, 
  checkOwnership(Post), 
  async (req, res) => {
    req.resource.title = req.body.title;
    req.resource.content = req.body.content;
    await req.resource.save();
    res.json(req.resource);
  }
);
```

---

### 3. Access Tokens with Permissions

Issue access tokens with user permissions encoded. Verify these tokens on the server-side for every request.

```javascript
// Generate token with permissions
function generateTokenWithPermissions(user) {
  const permissions = getUserPermissions(user.role);
  
  return jwt.sign(
    {
      userId: user._id,
      username: user.username,
      role: user.role,
      permissions: permissions
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
}

// Get permissions based on role
function getUserPermissions(role) {
  const rolePermissions = {
    user: ['read:own', 'write:own'],
    moderator: ['read:all', 'write:own', 'delete:own'],
    admin: ['read:all', 'write:all', 'delete:all', 'manage:users']
  };
  
  return rolePermissions[role] || [];
}

// Middleware to check specific permission
function requirePermission(permission) {
  return (req, res, next) => {
    if (!req.user || !req.user.permissions) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    if (!req.user.permissions.includes(permission)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    
    next();
  };
}

// Usage
app.delete('/users/:id', 
  authenticateToken, 
  requirePermission('manage:users'), 
  async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  }
);
```

---

## Complete Implementation Example

### Full Authentication & Authorization System

```javascript
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// User Model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['user', 'moderator', 'admin'], 
    default: 'user' 
  },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Register
app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields required' });
    }
    
    // Check if user exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const user = await User.create({
      username,
      email,
      password: hashedPassword
    });
    
    res.status(201).json({ 
      message: 'User registered successfully',
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Generate token
    const token = jwt.sign(
      { 
        userId: user._id,
        username: user.username,
        role: user.role
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({ 
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Authentication Middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
}

// Authorization Middleware
function authorizeRole(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied' });
    }
    next();
  };
}

// Protected Routes
app.get('/api/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/admin/users', 
  authenticateToken, 
  authorizeRole('admin'), 
  async (req, res) => {
    try {
      const users = await User.find().select('-password');
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
);

app.delete('/api/admin/users/:id', 
  authenticateToken, 
  authorizeRole('admin'), 
  async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

## Security Checklist

### Authentication
- [ ] Use HTTPS for all communications
- [ ] Hash passwords with bcrypt (salt rounds >= 10)
- [ ] Implement rate limiting on login endpoints
- [ ] Use secure session management
- [ ] Implement MFA for sensitive accounts
- [ ] Set secure cookie flags (httpOnly, secure, sameSite)
- [ ] Implement account lockout after failed attempts
- [ ] Use strong JWT secrets (store in environment variables)

### Authorization
- [ ] Implement role-based access control
- [ ] Validate permissions on every request
- [ ] Use principle of least privilege
- [ ] Implement resource ownership checks
- [ ] Log all authorization failures
- [ ] Regularly audit user permissions
- [ ] Implement token expiration and refresh

---

**Secure Your Applications! 🔒**