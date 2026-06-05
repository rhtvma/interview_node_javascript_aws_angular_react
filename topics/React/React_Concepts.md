# React - Complete Interview Preparation Guide

A comprehensive guide covering all essential React concepts for interview preparation.

---

## Table of Contents
1. [React Fundamentals](#react-fundamentals)
2. [JSX](#jsx)
3. [Components](#components)
4. [Props and State](#props-and-state)
5. [Virtual DOM](#virtual-dom)
6. [Lifecycle Methods](#lifecycle-methods)
7. [Hooks](#hooks)
8. [Context API](#context-api)
9. [Higher-Order Components (HOC)](#higher-order-components-hoc)
10. [React Router](#react-router)
11. [Redux](#redux)
12. [Performance Optimization](#performance-optimization)
13. [Common Interview Questions](#common-interview-questions)

---

## React Fundamentals

### What is React?
React is a JavaScript library for building user interfaces, particularly single-page applications. It was developed by Facebook and is maintained by Facebook and a community of developers.

**Key Features:**
- **Component-Based:** Build encapsulated components that manage their own state
- **Declarative:** Design simple views for each state in your application
- **Learn Once, Write Anywhere:** Can be used for web, mobile (React Native), and desktop applications
- **Virtual DOM:** Efficient rendering and updates
- **Unidirectional Data Flow:** Data flows from parent to child components

### Why React?
- **Reusable Components:** Write once, use anywhere
- **Fast Performance:** Virtual DOM optimization
- **Strong Community:** Large ecosystem of libraries and tools
- **SEO Friendly:** Server-side rendering support
- **Easy to Learn:** Simple API and good documentation

---

## JSX

### What is JSX (JavaScript XML)?
JSX is a syntax extension for JavaScript that lets you write HTML-like markup inside a JavaScript file. It makes React code more readable and easier to write.

```jsx
// JSX Example
const element = <h1>Hello, World!</h1>;

// Without JSX (using React.createElement)
const element = React.createElement('h1', null, 'Hello, World!');
```

### Rules for Writing JSX

#### 1. Return a Single Root Element
```jsx
// ✅ Correct - Using Fragment
function MyComponent() {
  return (
    <>
      <h1>Title</h1>
      <p>Paragraph</p>
    </>
  );
}

// ✅ Correct - Using div
function MyComponent() {
  return (
    <div>
      <h1>Title</h1>
      <p>Paragraph</p>
    </div>
  );
}

// ❌ Wrong - Multiple root elements
function MyComponent() {
  return (
    <h1>Title</h1>
    <p>Paragraph</p>
  );
}
```

#### 2. Use camelCase for Attributes
```jsx
// ✅ Correct
<div className="container" onClick={handleClick}>
  <label htmlFor="input">Name:</label>
  <input id="input" tabIndex={1} />
</div>

// ❌ Wrong
<div class="container" onclick={handleClick}>
  <label for="input">Name:</label>
</div>
```

#### 3. Close All Tags
```jsx
// ✅ Correct
<img src="image.jpg" alt="Description" />
<input type="text" />
<br />

// ❌ Wrong
<img src="image.jpg" alt="Description">
<input type="text">
<br>
```

#### 4. Use Curly Braces for JavaScript Expressions
```jsx
function Greeting({ name, age }) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>You are {age} years old</p>
      <p>Next year you'll be {age + 1}</p>
    </div>
  );
}
```

---

## Components

### Types of Components

#### 1. Functional Components (Recommended)
```jsx
// Simple Functional Component
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// Arrow Function Component
const Welcome = (props) => {
  return <h1>Hello, {props.name}</h1>;
};

// With Destructuring
const Welcome = ({ name, age }) => {
  return (
    <div>
      <h1>Hello, {name}</h1>
      <p>Age: {age}</p>
    </div>
  );
};
```

#### 2. Class Components (Legacy)
```jsx
import React, { Component } from 'react';

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  render() {
    return (
      <div>
        <h1>Hello, {this.props.name}</h1>
        <p>Count: {this.state.count}</p>
      </div>
    );
  }
}
```

### Controlled vs Uncontrolled Components

#### Controlled Components
```jsx
function ControlledForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, email });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <input 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

#### Uncontrolled Components
```jsx
function UncontrolledForm() {
  const nameRef = useRef();
  const emailRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      name: nameRef.current.value,
      email: emailRef.current.value
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={nameRef} />
      <input ref={emailRef} />
      <button type="submit">Submit</button>
    </form>
  );
}
```

---

## Props and State

### Props (Properties)

**Props are:**
- **Immutable:** Cannot be modified by the child component
- **Read-only:** Child components can only read props
- **Passed from parent to child:** Unidirectional data flow
- **Used for component configuration**

```jsx
// Parent Component
function Parent() {
  return (
    <Child 
      name="John" 
      age={30} 
      isActive={true}
      hobbies={['reading', 'coding']}
      onUpdate={(data) => console.log(data)}
    />
  );
}

// Child Component
function Child({ name, age, isActive, hobbies, onUpdate }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>Status: {isActive ? 'Active' : 'Inactive'}</p>
      <ul>
        {hobbies.map((hobby, index) => (
          <li key={index}>{hobby}</li>
        ))}
      </ul>
      <button onClick={() => onUpdate({ name, age })}>
        Update Parent
      </button>
    </div>
  );
}
```

### State

**State is:**
- **Mutable:** Can be changed within the component
- **Private:** Fully controlled by the component
- **Asynchronous:** State updates may be batched
- **Triggers re-render:** When state changes, component re-renders

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({
    name: 'John',
    age: 30
  });

  // Updating primitive state
  const increment = () => setCount(count + 1);

  // Updating object state (must spread previous state)
  const updateUser = () => {
    setUser(prevUser => ({
      ...prevUser,
      age: prevUser.age + 1
    }));
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      
      <p>User: {user.name}, Age: {user.age}</p>
      <button onClick={updateUser}>Update Age</button>
    </div>
  );
}
```

### Props vs State Comparison

| Feature | Props | State |
|---------|-------|-------|
| Mutability | Immutable | Mutable |
| Ownership | Parent component | Component itself |
| Can be changed by component | No | Yes |
| Triggers re-render | Yes (when parent updates) | Yes |
| Use case | Pass data to children | Manage component data |

---

## Virtual DOM

### What is the Virtual DOM?

The Virtual DOM is a lightweight, in-memory representation of the actual DOM. It's a JavaScript object that mirrors the structure of the real DOM.

**How it works:**

1. **Initial Render:** React creates a Virtual DOM tree
2. **State Change:** When state/props change, React creates a new Virtual DOM tree
3. **Diffing:** React compares the new Virtual DOM with the previous one (Reconciliation)
4. **Batch Updates:** React calculates the minimum changes needed
5. **Update Real DOM:** Only the changed elements are updated in the real DOM

```
State Change → New Virtual DOM → Diffing Algorithm → Minimal DOM Updates
```

### Benefits of Virtual DOM

1. **Performance:** Minimizes expensive DOM operations
2. **Batch Updates:** Multiple changes are batched together
3. **Efficient Re-rendering:** Only changed elements are updated
4. **Cross-platform:** Same concept works for React Native

### Example: How Virtual DOM Works

```jsx
// Initial State
<div>
  <h1>Count: 0</h1>
  <button>Increment</button>
</div>

// After State Change (count = 1)
<div>
  <h1>Count: 1</h1>  {/* Only this text node is updated */}
  <button>Increment</button>
</div>

// React only updates the text "0" to "1" in the real DOM
// The entire div and button remain unchanged
```

---

## Lifecycle Methods

### Class Component Lifecycle

React lifecycle methods provide hooks into specific points in a component's life cycle.

#### Mounting Phase (Component Creation)

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    // 1. Initialize state and bind methods
    this.state = { count: 0 };
    console.log('1. Constructor');
  }

  static getDerivedStateFromProps(props, state) {
    // 2. Update state based on props before rendering
    console.log('2. getDerivedStateFromProps');
    return null; // or return new state
  }

  componentDidMount() {
    // 4. Perform side effects (API calls, subscriptions)
    console.log('4. componentDidMount');
    // Good place for:
    // - API calls
    // - Setting up subscriptions
    // - Adding event listeners
  }

  render() {
    // 3. Return JSX for the component
    console.log('3. Render');
    return <div>Count: {this.state.count}</div>;
  }
}
```

#### Updating Phase (Component Updates)

```jsx
class MyComponent extends React.Component {
  static getDerivedStateFromProps(props, state) {
    // 1. Update state based on props during updates
    console.log('1. getDerivedStateFromProps');
    return null;
  }

  shouldComponentUpdate(nextProps, nextState) {
    // 2. Decide if re-render is necessary (optimization)
    console.log('2. shouldComponentUpdate');
    return true; // return false to prevent re-render
  }

  render() {
    // 3. Return updated JSX
    console.log('3. Render');
    return <div>Count: {this.state.count}</div>;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // 4. Capture information before DOM updates
    console.log('4. getSnapshotBeforeUpdate');
    return null; // or return snapshot value
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // 5. Perform actions after DOM updates
    console.log('5. componentDidUpdate');
    // Good place for:
    // - API calls based on prop/state changes
    // - DOM manipulations
  }
}
```

#### Unmounting Phase (Component Removal)

```jsx
class MyComponent extends React.Component {
  componentWillUnmount() {
    // Clean up resources before component is removed
    console.log('componentWillUnmount');
    // Good place for:
    // - Clearing timers
    // - Canceling API requests
    // - Removing event listeners
    // - Cleaning up subscriptions
  }

  render() {
    return <div>Component</div>;
  }
}
```

### Functional Component Lifecycle (with Hooks)

```jsx
function MyComponent() {
  // componentDidMount
  useEffect(() => {
    console.log('Component mounted');
  }, []);

  // componentDidUpdate (when dependency changes)
  useEffect(() => {
    console.log('Dependency changed');
  }, [dependency]);

  // componentWillUnmount
  useEffect(() => {
    return () => {
      console.log('Component will unmount');
    };
  }, []);

  // Combined: mount, update, and unmount
  useEffect(() => {
    console.log('Component mounted or updated');
    
    return () => {
      console.log('Cleanup before next effect or unmount');
    };
  }, [dependency]);

  return <div>Component</div>;
}
```

---

## Hooks

### Basic Hooks

#### useState
```jsx
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

#### useEffect
```jsx
function DataFetcher() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(data => setData(data));
  }, []); // Empty array = run once on mount

  return <div>{data ? JSON.stringify(data) : 'Loading...'}</div>;
}
```

For detailed Hooks documentation, see [Hooks.md](./Hooks.md)

---

## Context API

### What is Context API?

The Context API allows you to share state globally across a component tree without prop drilling (passing props through multiple levels).

### When to Use Context?
- **Theme data** (dark/light mode)
- **User authentication** status
- **Language/locale** preferences
- **Shopping cart** data
- Any data needed by many components at different nesting levels

### Basic Example

```jsx
import React, { createContext, useContext, useState } from 'react';

// 1. Create Context
const ThemeContext = createContext();

// 2. Create Provider Component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const value = {
    theme,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Create Custom Hook (optional but recommended)
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// 4. Use in Components
function ThemedButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme}
      style={{
        background: theme === 'dark' ? '#333' : '#FFF',
        color: theme === 'dark' ? '#FFF' : '#333'
      }}
    >
      Current Theme: {theme}
    </button>
  );
}

// 5. Wrap App with Provider
function App() {
  return (
    <ThemeProvider>
      <ThemedButton />
    </ThemeProvider>
  );
}
```

### Advanced Example - Authentication

```jsx
const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (token) {
      fetchUser(token).then(user => {
        setUser(user);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    localStorage.setItem('token', data.token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

// Usage
function Profile() {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Props Drilling Problem

```jsx
// ❌ Props Drilling - Passing props through multiple levels
function App() {
  const [user, setUser] = useState({ name: 'John' });
  return <Parent user={user} />;
}

function Parent({ user }) {
  return <Child user={user} />;
}

function Child({ user }) {
  return <GrandChild user={user} />;
}

function GrandChild({ user }) {
  return <div>{user.name}</div>;
}

// ✅ Context API - Direct access without prop drilling
function App() {
  return (
    <UserProvider>
      <Parent />
    </UserProvider>
  );
}

function GrandChild() {
  const { user } = useUser(); // Direct access!
  return <div>{user.name}</div>;
}
```

---

## Higher-Order Components (HOC)

### What is a Higher-Order Component?

A Higher-Order Component is a function that takes a component as input and returns a new component with additional functionality or modified behavior.

**Pattern:** `const EnhancedComponent = higherOrderComponent(WrappedComponent);`

### Basic Example

```jsx
// HOC that adds loading functionality
function withLoading(Component) {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    return <Component {...props} />;
  };
}

// Original Component
function UserList({ users }) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

// Enhanced Component
const UserListWithLoading = withLoading(UserList);

// Usage
function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers().then(data => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  return <UserListWithLoading isLoading={loading} users={users} />;
}
```

### Authentication HOC

```jsx
function withAuth(Component) {
  return function WithAuthComponent(props) {
    const { user, loading } = useAuth();

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!user) {
      return <Navigate to="/login" />;
    }

    return <Component {...props} user={user} />;
  };
}

// Usage
const ProtectedDashboard = withAuth(Dashboard);

function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<ProtectedDashboard />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
```

### Logger HOC

```jsx
function withLogger(Component) {
  return function WithLoggerComponent(props) {
    useEffect(() => {
      console.log(`${Component.name} mounted with props:`, props);
      
      return () => {
        console.log(`${Component.name} unmounted`);
      };
    }, [props]);

    return <Component {...props} />;
  };
}

// Usage
const UserProfileWithLogger = withLogger(UserProfile);
```

---

## React Router

### Installation
```bash
npm install react-router-dom
```

### Basic Setup

```jsx
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/users">Users</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
```

### Navigation Hooks

```jsx
import { useNavigate, useParams, useLocation, useSearchParams } from 'react-router-dom';

function UserDetail() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get URL parameters
  const location = useLocation(); // Get current location
  const [searchParams, setSearchParams] = useSearchParams(); // Get query params

  const goBack = () => navigate(-1);
  const goToHome = () => navigate('/');
  const goToUser = (userId) => navigate(`/users/${userId}`);

  return (
    <div>
      <h1>User ID: {id}</h1>
      <p>Current Path: {location.pathname}</p>
      <p>Query Param: {searchParams.get('tab')}</p>
      <button onClick={goBack}>Go Back</button>
    </div>
  );
}
```

### Protected Routes

```jsx
function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <Routes>
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
  );
}
```

### Nested Routes

```jsx
function App() {
  return (
    <Routes>
      <Route path="/users" element={<UsersLayout />}>
        <Route index element={<UsersList />} />
        <Route path=":id" element={<UserDetail />} />
        <Route path=":id/edit" element={<UserEdit />} />
      </Route>
    </Routes>
  );
}

function UsersLayout() {
  return (
    <div>
      <h1>Users Section</h1>
      <Outlet /> {/* Child routes render here */}
    </div>
  );
}
```

---

## Redux

### What is Redux?

Redux is a predictable state container for JavaScript applications. It helps manage the global state of your application in a single store.

### Core Concepts

#### 1. Store
The central repository that holds the entire state of the application.

```jsx
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';

const store = createStore(rootReducer);

function App() {
  return (
    <Provider store={store}>
      <YourApp />
    </Provider>
  );
}
```

#### 2. Actions
Plain JavaScript objects that describe what happened. Must have a `type` property.

```jsx
// Action Types
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const ADD_TODO = 'ADD_TODO';

// Action Creators
const increment = () => ({
  type: INCREMENT
});

const decrement = () => ({
  type: DECREMENT
});

const addTodo = (text) => ({
  type: ADD_TODO,
  payload: {
    id: Date.now(),
    text,
    completed: false
  }
});
```

#### 3. Reducers
Pure functions that take the current state and an action, and return a new state.

```jsx
// Counter Reducer
const initialState = { count: 0 };

function counterReducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return { ...state, count: state.count + 1 };
    case DECREMENT:
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
}

// Todo Reducer
const todoInitialState = { todos: [] };

function todoReducer(state = todoInitialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    default:
      return state;
  }
}

// Combine Reducers
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  counter: counterReducer,
  todos: todoReducer
});
```

#### 4. Dispatch
Method to send actions to the store.

```jsx
import { useDispatch, useSelector } from 'react-redux';

function Counter() {
  const count = useSelector(state => state.counter.count);
  const dispatch = useDispatch();

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
}
```

### Redux Toolkit (Modern Approach)

```jsx
import { configureStore, createSlice } from '@reduxjs/toolkit';

// Create Slice
const counterSlice = createSlice({
  name: 'counter',
  initialState: { count: 0 },
  reducers: {
    increment: (state) => {
      state.count += 1; // Immer allows direct mutation
    },
    decrement: (state) => {
      state.count -= 1;
    },
    incrementByAmount: (state, action) => {
      state.count += action.payload;
    }
  }
});

// Export actions
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// Configure Store
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer
  }
});

// Usage in Component
function Counter() {
  const count = useSelector(state => state.counter.count);
  const dispatch = useDispatch();

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>
    </div>
  );
}
```

### Redux Data Flow

```
User Action → dispatch(action) → Reducer → New State → Component Re-render
```

---

## Performance Optimization

### 1. React.memo
Prevents unnecessary re-renders of functional components.

```jsx
const ExpensiveComponent = React.memo(({ data }) => {
  console.log('Rendering ExpensiveComponent');
  return <div>{data}</div>;
});

// Component only re-renders when 'data' prop changes
```

### 2. useMemo
Memoizes expensive calculations.

```jsx
function DataProcessor({ data }) {
  const processedData = useMemo(() => {
    console.log('Processing data...');
    return data.map(item => item * 2);
  }, [data]); // Only recalculate when data changes

  return <div>{processedData.join(', ')}</div>;
}
```

### 3. useCallback
Memoizes callback functions.

```jsx
function Parent() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log('Clicked');
  }, []); // Function reference stays the same

  return <Child onClick={handleClick} />;
}

const Child = React.memo(({ onClick }) => {
  console.log('Child rendered');
  return <button onClick={onClick}>Click</button>;
});
```

### 4. Code Splitting with React.lazy

```jsx
import React, { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
```

### 5. Virtualization for Long Lists

```jsx
import { FixedSizeList } from 'react-window';

function VirtualizedList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      {items[index]}
    </div>
  );

  return (
    <FixedSizeList
      height={400}
      itemCount={items.length}
      itemSize={35}
      width="100%"
    >
      {Row}
    </FixedSizeList>
  );
}
```

### 6. Avoid Inline Functions and Objects

```jsx
// ❌ Bad - Creates new function on every render
<button onClick={() => handleClick(id)}>Click</button>

// ✅ Good - Use useCallback
const handleClickMemo = useCallback(() => handleClick(id), [id]);
<button onClick={handleClickMemo}>Click</button>

// ❌ Bad - Creates new object on every render
<Component style={{ color: 'red' }} />

// ✅ Good - Define outside or use useMemo
const style = { color: 'red' };
<Component style={style} />
```

---

## Common Interview Questions

### 1. What is React and why use it?
React is a JavaScript library for building user interfaces. Benefits include component reusability, virtual DOM for performance, strong ecosystem, and declarative programming.

### 2. What is the difference between state and props?
- **Props:** Immutable, passed from parent, read-only
- **State:** Mutable, managed within component, triggers re-render

### 3. What is the Virtual DOM?
A lightweight copy of the real DOM. React uses it to efficiently update only changed elements through a diffing algorithm.

### 4. Explain React lifecycle methods
Mounting (constructor, render, componentDidMount), Updating (render, componentDidUpdate), Unmounting (componentWillUnmount).

### 5. What are React Hooks?
Functions that let you use state and lifecycle features in functional components (useState, useEffect, useContext, etc.).

### 6. What is prop drilling and how to avoid it?
Passing props through multiple component levels. Avoid using Context API, Redux, or component composition.

### 7. What is the difference between controlled and uncontrolled components?
- **Controlled:** Form data handled by React state
- **Uncontrolled:** Form data handled by DOM (using refs)

### 8. What is React.memo and when to use it?
Higher-order component that memoizes functional components to prevent unnecessary re-renders when props haven't changed.

### 9. What is useCallback vs useMemo?
- **useCallback:** Memoizes functions
- **useMemo:** Memoizes values/calculations

### 10. What is Redux and when to use it?
State management library for complex applications with shared state across many components.

### 11. What is the difference between useEffect and useLayoutEffect?
- **useEffect:** Runs after paint (asynchronous)
- **useLayoutEffect:** Runs before paint (synchronous)

### 12. How to optimize React performance?
React.memo, useMemo, useCallback, code splitting, virtualization, avoid inline functions/objects.

### 13. What is Context API?
Built-in state management solution to avoid prop drilling by sharing data globally.

### 14. What are Higher-Order Components?
Functions that take a component and return a new enhanced component with additional functionality.

### 15. Explain React Router
Library for handling navigation and routing in React applications.

---

## Best Practices

1. **Use Functional Components** with Hooks (modern approach)
2. **Keep Components Small** and focused on single responsibility
3. **Use PropTypes or TypeScript** for type checking
4. **Avoid Prop Drilling** - use Context API or state management
5. **Memoize Expensive Operations** with useMemo/useCallback
6. **Use Keys Properly** in lists (unique, stable identifiers)
7. **Handle Errors** with Error Boundaries
8. **Code Splitting** for large applications
9. **Follow Naming Conventions** (PascalCase for components)
10. **Write Clean, Readable Code** with proper comments

---

**Happy Learning! 🚀**
