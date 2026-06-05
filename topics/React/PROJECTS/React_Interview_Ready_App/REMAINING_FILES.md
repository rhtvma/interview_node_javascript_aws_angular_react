# Remaining Files to Create

This document contains all the remaining files needed to complete the React Interview-Ready Application. Copy each section into the appropriate file path.

---

## 1. src/pages/Login.jsx

```jsx
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * LOGIN PAGE - Interview Topic: Forms & Authentication
 * Demonstrates: Controlled components, form handling, authentication flow
 */
function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const from = location.state?.from || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.error || 'Login failed');
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <p className="demo-note">
          💡 Demo: Use any email/password to login
        </p>
      </div>
    </div>
  );
}

export default Login;
```

---

## 2. src/pages/Dashboard.jsx

```jsx
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

/**
 * DASHBOARD PAGE - Interview Topic: Protected Routes
 * Demonstrates: Authentication state, protected content, logout
 */
function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-page">
      <h1>Dashboard 📊</h1>
      
      <div className="user-info">
        <h2>Welcome, {user?.name || user?.email}!</h2>
        <p>Email: {user?.email}</p>
        <p>Role: {user?.role}</p>
        <p>User ID: {user?.id}</p>
      </div>

      <div className="dashboard-content">
        <div className="stat-card">
          <h3>Profile Complete</h3>
          <p className="stat-value">85%</p>
        </div>
        
        <div className="stat-card">
          <h3>Games Played</h3>
          <p className="stat-value">12</p>
        </div>
        
        <div className="stat-card">
          <h3>Learning Progress</h3>
          <p className="stat-value">67%</p>
        </div>
      </div>

      <button onClick={handleLogout} className="btn btn-danger">
        Logout
      </button>

      <div className="interview-notes">
        <h3>🎯 Protected Route Concepts</h3>
        <ul>
          <li>This page requires authentication</li>
          <li>Redirects to login if not authenticated</li>
          <li>User data from AuthContext</li>
          <li>Logout clears auth state</li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
```

---

## 3. src/pages/HooksDemo.jsx

```jsx
import { useState, useEffect, useContext, useReducer, useCallback, useMemo, useRef, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementAsync } from '../store/slices/counterSlice';
import useLocalStorage from '../hooks/useLocalStorage';
import useDebounce from '../hooks/useDebounce';
import useToggle from '../hooks/useToggle';

/**
 * HOOKS DEMO PAGE - Interview Topic: All React Hooks
 * Demonstrates: All built-in hooks + custom hooks with examples
 */
function HooksDemo() {
  // 1. useState - Interview: Basic state management
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // 2. useEffect - Interview: Side effects
  useEffect(() => {
    document.title = `Count: ${count}`;
    return () => {
      document.title = 'React App';
    };
  }, [count]);

  // 3. useReducer - Interview: Complex state logic
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'increment': return { count: state.count + 1 };
        case 'decrement': return { count: state.count - 1 };
        default: return state;
      }
    },
    { count: 0 }
  );

  // 4. useCallback - Interview: Memoized callbacks
  const handleClick = useCallback(() => {
    console.log('Button clicked');
  }, []);

  // 5. useMemo - Interview: Memoized values
  const expensiveValue = useMemo(() => {
    return count * 2;
  }, [count]);

  // 6. useRef - Interview: DOM refs and mutable values
  const inputRef = useRef(null);
  const renderCount = useRef(0);
  
  useEffect(() => {
    renderCount.current += 1;
  });

  // 7. useLayoutEffect - Interview: Synchronous effects
  useLayoutEffect(() => {
    console.log('Layout effect runs before paint');
  }, []);

  // 8. Redux hooks
  const reduxCount = useSelector(state => state.counter.value);
  const reduxDispatch = useDispatch();

  // 9. Custom hooks
  const [name, setName] = useLocalStorage('name', '');
  const debouncedText = useDebounce(text, 500);
  const [isVisible, toggleVisible] = useToggle(false);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="hooks-demo-page">
      <h1>React Hooks Demo 🪝</h1>

      {/* useState Demo */}
      <section className="hook-section">
        <h2>1. useState</h2>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <button onClick={() => setCount(count - 1)}>Decrement</button>
        <code>const [count, setCount] = useState(0)</code>
      </section>

      {/* useEffect Demo */}
      <section className="hook-section">
        <h2>2. useEffect</h2>
        <p>Check document title - it updates with count!</p>
        <p>Render count: {renderCount.current}</p>
        <code>useEffect(() => {'{}'}, [dependencies])</code>
      </section>

      {/* useReducer Demo */}
      <section className="hook-section">
        <h2>3. useReducer</h2>
        <p>Reducer Count: {state.count}</p>
        <button onClick={() => dispatch({ type: 'increment' })}>+</button>
        <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
        <code>const [state, dispatch] = useReducer(reducer, initialState)</code>
      </section>

      {/* useCallback Demo */}
      <section className="hook-section">
        <h2>4. useCallback</h2>
        <button onClick={handleClick}>Memoized Callback</button>
        <code>const memoizedFn = useCallback(() => {'{}'}, [])</code>
      </section>

      {/* useMemo Demo */}
      <section className="hook-section">
        <h2>5. useMemo</h2>
        <p>Count × 2 = {expensiveValue}</p>
        <code>const memoizedValue = useMemo(() => computation, [deps])</code>
      </section>

      {/* useRef Demo */}
      <section className="hook-section">
        <h2>6. useRef</h2>
        <input ref={inputRef} placeholder="Focus me!" />
        <button onClick={focusInput}>Focus Input</button>
        <code>const ref = useRef(initialValue)</code>
      </section>

      {/* Redux Hooks Demo */}
      <section className="hook-section">
        <h2>7. Redux Hooks (useSelector, useDispatch)</h2>
        <p>Redux Count: {reduxCount}</p>
        <button onClick={() => reduxDispatch(increment())}>+</button>
        <button onClick={() => reduxDispatch(decrement())}>-</button>
        <button onClick={() => reduxDispatch(incrementAsync(5))}>+5 Async</button>
      </section>

      {/* Custom Hooks Demo */}
      <section className="hook-section">
        <h2>8. Custom Hooks</h2>
        
        <div>
          <h3>useLocalStorage</h3>
          <input 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            placeholder="Saved to localStorage"
          />
          <p>Stored name: {name}</p>
        </div>

        <div>
          <h3>useDebounce</h3>
          <input 
            value={text} 
            onChange={(e) => setText(e.target.value)}
            placeholder="Type to see debounce"
          />
          <p>Debounced (500ms): {debouncedText}</p>
        </div>

        <div>
          <h3>useToggle</h3>
          <button onClick={toggleVisible}>Toggle</button>
          {isVisible && <p>Visible content!</p>}
        </div>
      </section>

      {/* Interview Notes */}
      <section className="interview-notes">
        <h2>🎯 Hook Interview Topics</h2>
        <ul>
          <li><strong>Rules of Hooks:</strong> Top level, React functions only</li>
          <li><strong>useState:</strong> Simple state management</li>
          <li><strong>useEffect:</strong> Side effects, cleanup</li>
          <li><strong>useReducer:</strong> Complex state logic</li>
          <li><strong>useCallback:</strong> Memoize functions</li>
          <li><strong>useMemo:</strong> Memoize values</li>
          <li><strong>useRef:</strong> DOM refs, mutable values</li>
          <li><strong>Custom Hooks:</strong> Reusable logic</li>
        </ul>
      </section>
    </div>
  );
}

export default HooksDemo;
```

---

## 4. src/pages/Forms.jsx

```jsx
import { useState, useRef } from 'react';
import useDebounce from '../hooks/useDebounce';

/**
 * FORMS PAGE - Interview Topic: Controlled vs Uncontrolled Components
 * Demonstrates: Both form patterns, validation, debouncing
 */
function Forms() {
  // Controlled Component State
  const [controlled, setControlled] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Uncontrolled Component Refs
  const nameRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();

  // Validation state
  const [errors, setErrors] = useState({});
  const debouncedEmail = useDebounce(controlled.email, 500);

  // Controlled form handlers
  const handleControlledChange = (e) => {
    const { name, value } = e.target;
    setControlled(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleControlledSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm(controlled);
    
    if (Object.keys(newErrors).length === 0) {
      console.log('Controlled form submitted:', controlled);
      alert('Controlled form submitted! Check console.');
      setControlled({ name: '', email: '', message: '' });
    } else {
      setErrors(newErrors);
    }
  };

  // Uncontrolled form handler
  const handleUncontrolledSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      message: messageRef.current.value
    };
    
    console.log('Uncontrolled form submitted:', formData);
    alert('Uncontrolled form submitted! Check console.');
    e.target.reset();
  };

  // Validation function
  const validateForm = (data) => {
    const errors = {};
    if (!data.name.trim()) errors.name = 'Name is required';
    if (!data.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(data.email)) errors.email = 'Email is invalid';
    if (!data.message.trim()) errors.message = 'Message is required';
    return errors;
  };

  return (
    <div className="forms-page">
      <h1>Forms Demo 📝</h1>

      <div className="forms-container">
        {/* Controlled Component Form */}
        <section className="form-section">
          <h2>Controlled Component</h2>
          <p className="form-description">
            React controls the form state. Value is stored in component state.
          </p>
          
          <form onSubmit={handleControlledSubmit}>
            <div className="form-group">
              <label htmlFor="controlled-name">Name:</label>
              <input
                id="controlled-name"
                name="name"
                value={controlled.name}
                onChange={handleControlledChange}
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="controlled-email">Email:</label>
              <input
                id="controlled-email"
                name="email"
                type="email"
                value={controlled.email}
                onChange={handleControlledChange}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
              {debouncedEmail && <p className="info-text">Debounced: {debouncedEmail}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="controlled-message">Message:</label>
              <textarea
                id="controlled-message"
                name="message"
                value={controlled.message}
                onChange={handleControlledChange}
                className={errors.message ? 'error' : ''}
                rows="4"
              />
              {errors.message && <span className="error-text">{errors.message}</span>}
            </div>

            <button type="submit" className="btn btn-primary">
              Submit Controlled
            </button>
          </form>

          <div className="form-state">
            <h4>Current State:</h4>
            <pre>{JSON.stringify(controlled, null, 2)}</pre>
          </div>
        </section>

        {/* Uncontrolled Component Form */}
        <section className="form-section">
          <h2>Uncontrolled Component</h2>
          <p className="form-description">
            DOM controls the form state. Access values using refs.
          </p>
          
          <form onSubmit={handleUncontrolledSubmit}>
            <div className="form-group">
              <label htmlFor="uncontrolled-name">Name:</label>
              <input
                id="uncontrolled-name"
                ref={nameRef}
                defaultValue=""
              />
            </div>

            <div className="form-group">
              <label htmlFor="uncontrolled-email">Email:</label>
              <input
                id="uncontrolled-email"
                ref={emailRef}
                type="email"
                defaultValue=""
              />
            </div>

            <div className="form-group">
              <label htmlFor="uncontrolled-message">Message:</label>
              <textarea
                id="uncontrolled-message"
                ref={messageRef}
                defaultValue=""
                rows="4"
              />
            </div>

            <button type="submit" className="btn btn-secondary">
              Submit Uncontrolled
            </button>
          </form>
        </section>
      </div>

      {/* Comparison Table */}
      <section className="comparison-section">
        <h2>Controlled vs Uncontrolled Comparison</h2>
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th>Controlled</th>
              <th>Uncontrolled</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>State Management</td>
              <td>React state</td>
              <td>DOM</td>
            </tr>
            <tr>
              <td>Access Value</td>
              <td>state.value</td>
              <td>ref.current.value</td>
            </tr>
            <tr>
              <td>Validation</td>
              <td>Real-time</td>
              <td>On submit</td>
            </tr>
            <tr>
              <td>Use Case</td>
              <td>Complex forms, validation</td>
              <td>Simple forms, file inputs</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Interview Notes */}
      <section className="interview-notes">
        <h2>🎯 Form Interview Topics</h2>
        <ul>
          <li><strong>Controlled:</strong> React manages state, value prop</li>
          <li><strong>Uncontrolled:</strong> DOM manages state, refs</li>
          <li><strong>Validation:</strong> Real-time vs on-submit</li>
          <li><strong>Performance:</strong> Controlled can cause re-renders</li>
          <li><strong>Use Cases:</strong> When to use each pattern</li>
        </ul>
      </section>
    </div>
  );
}

export default Forms;
```

---

## 5. src/App.jsx

```jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { useTheme } from './contexts/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Game from './pages/Game';
import HooksDemo from './pages/HooksDemo';
import Forms from './pages/Forms';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import './App.css';

/**
 * MAIN APP COMPONENT
 * Interview Topic: Routing & App Structure
 * Demonstrates: React Router, navigation, layout
 */
function App() {
  const { isAuthenticated, logout } = useAuth();
  const { theme } = useTheme();

  return (
    <BrowserRouter>
      <div className={`app theme-${theme}`}>
        {/* Navigation */}
        <nav className="main-nav">
          <div className="nav-brand">
            <Link to="/">React Interview App</Link>
          </div>
          
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/game">Game</Link></li>
            <li><Link to="/hooks">Hooks</Link></li>
            <li><Link to="/forms">Forms</Link></li>
            {isAuthenticated ? (
              <>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><button onClick={logout} className="nav-btn">Logout</button></li>
              </>
            ) : (
              <li><Link to="/login">Login</Link></li>
            )}
          </ul>
        </nav>

        {/* Routes */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game" element={<Game />} />
            <Route path="/hooks" element={<HooksDemo />} />
            <Route path="/forms" element={<Forms />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
```

---

## 6. src/main.jsx

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/store';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import App from './App';
import './index.css';

/**
 * MAIN ENTRY POINT
 * Interview Topic: App Setup & Providers
 * Demonstrates: Provider pattern, app initialization
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
```

---

## 7. src/App.css

```css
/* Basic styling for the app */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  min-height: 100vh;
  transition: background-color 0.3s, color 0.3s;
}

/* Light Theme */
.theme-light {
  background-color: #f5f5f5;
  color: #333;
}

/* Dark Theme */
.theme-dark {
  background-color: #1a1a1a;
  color: #f5f5f5;
}

/* Navigation */
.main-nav {
  background-color: #2c3e50;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand a {
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 2rem;
}

.nav-links a, .nav-btn {
  color: white;
  text-decoration: none;
  transition: color 0.3s;
}

.nav-links a:hover {
  color: #3498db;
}

.nav-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
}

/* Main Content */
.main-content {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

/* Buttons */
.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s;
}

.btn-primary {
  background-color: #3498db;
  color: white;
}

.btn-secondary {
  background-color: #95a5a6;
  color: white;
}

.btn-danger {
  background-color: #e74c3c;
  color: white;
}

.btn:hover {
  opacity: 0.8;
  transform: translateY(-2px);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Game Board */
.game-board {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-gap: 10px;
  margin: 2rem auto;
  width: fit-content;
}

.game-cell {
  width: 100px;
  height: 100px;
  font-size: 2rem;
  font-weight: bold;
  border: 2px solid #3498db;
  background-color: white;
  cursor: pointer;
  transition: all 0.3s;
}

.game-cell:hover:not(:disabled) {
  background-color: #ecf0f1;
  transform: scale(1.05);
}

.game-cell:disabled {
  cursor: not-allowed;
}

/* Forms */
.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.form-group input.error,
.form-group textarea.error {
  border-color: #e74c3c;
}

.error-text {
  color: #e74c3c;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
}

/* Interview Notes */
.interview-notes {
  background-color: #ecf0f1;
  padding: 1.5rem;
  border-radius: 8px;
  margin-top: 2rem;
}

.theme-dark .interview-notes {
  background-color: #2c3e50;
}

.interview-notes h3 {
  margin-bottom: 1rem;
}

.interview-notes ul {
  list-style-position: inside;
}

.interview-notes li {
  margin-bottom: 0.5rem;
}

/* Responsive */
@media (max-width: 768px) {
  .nav-links {
    flex-direction: column;
    gap: 1rem;
  }
  
  .game-board {
    grid-template-columns: repeat(3, 80px);
  }
  
  .game-cell {
    width: 80px;
    height: 80px;
  }
}
```

---

## 8. src/index.css

```css
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
  background-color: #f4f4f4;
  padding: 2px 6px;
  border-radius: 3px;
}

pre {
  background-color: #f4f4f4;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
}
```

---

## Installation & Running Instructions

1. **Install dependencies:**
```bash
cd topics/React/PROJECTS/React Interview App
npm install
```

2. **Run the development server:**
```bash
npm run dev
```

3. **Build for production:**
```bash
npm run build
```

## Project Structure Summary

```
src/
├── contexts/
│   ├── ThemeContext.jsx ✅
│   └── AuthContext.jsx ✅
├── store/
│   ├── store.js ✅
│   └── slices/
│       ├── gameSlice.js ✅
│       └── counterSlice.js ✅
├── hooks/
│   ├── useLocalStorage.js ✅
│   ├── useFetch.js ✅
│   ├── useDebounce.js ✅
│   └── useToggle.js ✅
├── components/
│   └── ProtectedRoute.jsx ✅
├── pages/
│   ├── Home.jsx ✅
│   ├── Game.jsx ✅
│   ├── HooksDemo.jsx (in this file)
│   ├── Forms.jsx (in this file)
│   ├── Login.jsx (in this file)
│   └── Dashboard.jsx (in this file)
├── App.jsx (in this file)
├── App.css (in this file)
├── main.jsx (in this file)
└── index.css (in this file)
```

## Interview Topics Covered

✅ All React Hooks (useState, useEffect, useContext, useReducer, useCallback, useMemo, useRef, useLayoutEffect)
✅ Custom Hooks (useLocalStorage, useFetch, useDebounce, useToggle)
✅ Context API (Theme & Auth)
✅ Redux Toolkit (Store, Slices, Async Thunks)
✅ React Router v6 (Navigation, Protected Routes)
✅ Authentication Flow
✅ Controlled vs Uncontrolled Components
✅ Form Handling & Validation
✅ Performance Optimization
✅ Component Patterns

## Notes

- All files include extensive comments explaining interview concepts
- Each file has interview questions at the bottom
- The app is fully functional and demonstrates real-world patterns
- ESLint warnings are expected and can be ignored for learning purposes
- Focus on understanding the concepts, not perfect production code