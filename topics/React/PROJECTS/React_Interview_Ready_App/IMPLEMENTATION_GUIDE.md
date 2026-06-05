# React Interview-Ready App - Implementation Guide

This guide provides the complete file structure and code snippets for transforming the tic-tac-toe game into a comprehensive React interview preparation project.

## 📁 Complete File Structure

```
src/
├── components/
│   ├── common/
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Card.jsx
│   │   └── Loading.jsx
│   ├── game/
│   │   ├── GameBoard.jsx
│   │   ├── Player.jsx
│   │   ├── GameOver.jsx
│   │   └── GameLog.jsx
│   ├── forms/
│   │   ├── ControlledForm.jsx
│   │   ├── UncontrolledForm.jsx
│   │   └── LoginForm.jsx
│   ├── layout/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── Sidebar.jsx
│   └── hoc/
│       ├── withAuth.jsx
│       └── withLoading.jsx
├── pages/
│   ├── Home.jsx
│   ├── Game.jsx
│   ├── Dashboard.jsx
│   ├── Login.jsx
│   ├── HooksDemo.jsx
│   └── NotFound.jsx
├── context/
│   ├── ThemeContext.jsx
│   └── AuthContext.jsx
├── redux/
│   ├── store.js
│   └── slices/
│       ├── gameSlice.js
│       └── userSlice.js
├── hooks/
│   ├── useLocalStorage.js
│   ├── useFetch.js
│   ├── useDebounce.js
│   ├── useToggle.js
│   └── useWindowSize.js
├── utils/
│   ├── validators.js
│   ├── helpers.js
│   └── constants.js
├── services/
│   └── api.js
├── routes/
│   ├── ProtectedRoute.jsx
│   └── PublicRoute.jsx
├── App.jsx
└── main.jsx
```

## 🔧 Installation Commands

```bash
# Navigate to project directory
cd topics/React/PROJECTS/React Interview App

# Install dependencies
npm install

# Start development server
npm run dev
```

## 📝 Key Files to Create

### 1. Context API - Theme Context

**File**: `src/context/ThemeContext.jsx`

```jsx
/**
 * THEME CONTEXT - Global Theme Management
 * 
 * Interview Topics Covered:
 * - Context API usage
 * - Provider pattern
 * - State management without Redux
 * - Custom context hooks
 */

import { createContext, useContext, useState, useEffect } from 'react';

// Create context
const ThemeContext = createContext();

// Custom hook for consuming context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

// Provider component
export const ThemeProvider = ({ children }) => {
  // State: dark or light theme
  const [theme, setTheme] = useState(() => {
    // Initialize from localStorage
    return localStorage.getItem('theme') || 'light';
  });

  // Effect: Persist theme to localStorage
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Toggle between themes
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const value = {
    theme,
    toggleTheme,
    isDark: theme === 'dark'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
```

### 2. Context API - Authentication Context

**File**: `src/context/AuthContext.jsx`

```jsx
/**
 * AUTH CONTEXT - Authentication Management
 * 
 * Interview Topics:
 * - Authentication flow
 * - Protected routes
 * - Token management
 * - User session handling
 */

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (credentials) => {
    try {
      // Simulate API call
      const mockUser = {
        id: 1,
        username: credentials.username,
        email: `${credentials.username}@example.com`,
        role: 'user'
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
```

### 3. Redux Store Setup

**File**: `src/redux/store.js`

```jsx
/**
 * REDUX STORE - Centralized State Management
 * 
 * Interview Topics:
 * - Redux Toolkit setup
 * - Store configuration
 * - Middleware
 * - DevTools integration
 */

import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './slices/gameSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    game: gameReducer,
    user: userReducer
  },
  // Middleware and DevTools are included by default
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export default store;
```

**File**: `src/redux/slices/gameSlice.js`

```jsx
/**
 * GAME SLICE - Game State Management
 * 
 * Interview Topics:
 * - Redux Toolkit slices
 * - Reducers and actions
 * - Immutable updates
 * - Selectors
 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  board: Array(9).fill(null),
  currentPlayer: 'X',
  winner: null,
  gameOver: false,
  moves: []
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    // Make a move
    makeMove: (state, action) => {
      const { index } = action.payload;
      
      if (state.board[index] || state.gameOver) return;
      
      state.board[index] = state.currentPlayer;
      state.moves.push({ player: state.currentPlayer, index });
      
      // Check for winner
      const winner = calculateWinner(state.board);
      if (winner) {
        state.winner = winner;
        state.gameOver = true;
      } else if (state.board.every(cell => cell !== null)) {
        state.gameOver = true;
      } else {
        state.currentPlayer = state.currentPlayer === 'X' ? 'O' : 'X';
      }
    },
    
    // Reset game
    resetGame: (state) => {
      Object.assign(state, initialState);
    },
    
    // Undo last move
    undoMove: (state) => {
      if (state.moves.length === 0) return;
      
      const lastMove = state.moves.pop();
      state.board[lastMove.index] = null;
      state.currentPlayer = lastMove.player;
      state.winner = null;
      state.gameOver = false;
    }
  }
});

// Helper function to calculate winner
function calculateWinner(board) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];
  
  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

export const { makeMove, resetGame, undoMove } = gameSlice.actions;
export default gameSlice.reducer;

// Selectors
export const selectBoard = (state) => state.game.board;
export const selectCurrentPlayer = (state) => state.game.currentPlayer;
export const selectWinner = (state) => state.game.winner;
export const selectGameOver = (state) => state.game.gameOver;
```

### 4. Custom Hooks

**File**: `src/hooks/useLocalStorage.js`

```jsx
/**
 * USE LOCAL STORAGE HOOK
 * 
 * Interview Topics:
 * - Custom hooks creation
 * - localStorage integration
 * - State persistence
 * - Error handling
 */

import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  // State to store our value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  };

  return [storedValue, setValue];
}
```

**File**: `src/hooks/useFetch.js`

```jsx
/**
 * USE FETCH HOOK
 * 
 * Interview Topics:
 * - Data fetching
 * - Loading states
 * - Error handling
 * - Cleanup
 */

import { useState, useEffect } from 'react';

export function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url, {
          ...options,
          signal: controller.signal
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const json = await response.json();
        
        if (isMounted) {
          setData(json);
          setError(null);
        }
      } catch (err) {
        if (isMounted && err.name !== 'AbortError') {
          setError(err.message);
          setData(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [url]);

  return { data, loading, error };
}
```

**File**: `src/hooks/useDebounce.js`

```jsx
/**
 * USE DEBOUNCE HOOK
 * 
 * Interview Topics:
 * - Performance optimization
 * - Debouncing technique
 * - useEffect cleanup
 */

import { useState, useEffect } from 'react';

export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set up the timeout
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function - cancel timeout if value changes
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
```

### 5. Protected Route Component

**File**: `src/routes/ProtectedRoute.jsx`

```jsx
/**
 * PROTECTED ROUTE COMPONENT
 * 
 * Interview Topics:
 * - Route protection
 * - Authentication checks
 * - Redirect logic
 * - React Router v6
 */

import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  // Show loading while checking authentication
  if (loading) {
    return <div>Loading...</div>;
  }

  // Redirect to login if not authenticated
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
```

### 6. Main App Component with Router

**File**: `src/App.jsx`

```jsx
/**
 * MAIN APP COMPONENT
 * 
 * Interview Topics:
 * - React Router setup
 * - Route configuration
 * - Nested routes
 * - Layout components
 * - Context providers
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './routes/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Game from './pages/Game';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import HooksDemo from './pages/HooksDemo';
import NotFound from './pages/NotFound';

// Layout
import Header from './components/layout/Header';

function App() {
  return (
    // Redux Provider - Global state management
    <Provider store={store}>
      {/* Theme Provider - Theme context */}
      <ThemeProvider>
        {/* Auth Provider - Authentication context */}
        <AuthProvider>
          {/* Router - Navigation */}
          <BrowserRouter>
            <div className="app">
              <Header />
              <main>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/hooks-demo" element={<HooksDemo />} />
                  
                  {/* Protected Routes */}
                  <Route element={<ProtectedRoute />}>
                    <Route path="/game" element={<Game />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                  </Route>
                  
                  {/* 404 Route */}
                  <Route path="/404" element={<NotFound />} />
                  <Route path="*" element={<Navigate to="/404" replace />} />
                </Routes>
              </main>
            </div>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
```

### 7. Hooks Demo Page (All Hooks Examples)

**File**: `src/pages/HooksDemo.jsx`

```jsx
/**
 * HOOKS DEMONSTRATION PAGE
 * 
 * Interview Topics:
 * - All React hooks
 * - Hook rules
 * - Custom hooks
 * - Performance optimization
 */

import { useState, useEffect, useContext, useReducer, useCallback, 
         useMemo, useRef, useLayoutEffect, useImperativeHandle, 
         forwardRef } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useDebounce } from '../hooks/useDebounce';
import { useToggle } from '../hooks/useToggle';

function HooksDemo() {
  // ========== useState ==========
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  // ========== useEffect ==========
  useEffect(() => {
    console.log('Component mounted');
    
    // Cleanup function
    return () => {
      console.log('Component will unmount');
    };
  }, []); // Empty dependency array - runs once

  useEffect(() => {
    console.log(`Count changed to: ${count}`);
  }, [count]); // Runs when count changes

  // ========== useReducer ==========
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  
  function reducer(state, action) {
    switch (action.type) {
      case 'increment':
        return { count: state.count + 1 };
      case 'decrement':
        return { count: state.count - 1 };
      default:
        return state;
    }
  }

  // ========== useCallback ==========
  const handleClick = useCallback(() => {
    console.log('Button clicked');
  }, []); // Memoized function

  // ========== useMemo ==========
  const expensiveCalculation = useMemo(() => {
    console.log('Calculating...');
    return count * 2;
  }, [count]); // Only recalculates when count changes

  // ========== useRef ==========
  const inputRef = useRef(null);
  const renderCount = useRef(0);
  
  useEffect(() => {
    renderCount.current += 1;
  });

  const focusInput = () => {
    inputRef.current?.focus();
  };

  // ========== Custom Hooks ==========
  const [savedValue, setSavedValue] = useLocalStorage('myKey', '');
  const debouncedSearch = useDebounce(name, 500);
  const [isOn, toggle] = useToggle(false);

  return (
    <div className="hooks-demo">
      <h1>React Hooks Demonstration</h1>
      
      {/* useState Example */}
      <section>
        <h2>useState</h2>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </section>

      {/* useEffect Example */}
      <section>
        <h2>useEffect</h2>
        <p>Check console for lifecycle logs</p>
      </section>

      {/* useReducer Example */}
      <section>
        <h2>useReducer</h2>
        <p>Reducer Count: {state.count}</p>
        <button onClick={() => dispatch({ type: 'increment' })}>+</button>
        <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      </section>

      {/* useMemo Example */}
      <section>
        <h2>useMemo</h2>
        <p>Expensive Calculation: {expensiveCalculation}</p>
        <p>Render Count: {renderCount.current}</p>
      </section>

      {/* useRef Example */}
      <section>
        <h2>useRef</h2>
        <input ref={inputRef} type="text" />
        <button onClick={focusInput}>Focus Input</button>
      </section>

      {/* Custom Hooks Example */}
      <section>
        <h2>Custom Hooks</h2>
        <input 
          value={savedValue} 
          onChange={(e) => setSavedValue(e.target.value)}
          placeholder="Saved to localStorage"
        />
        <p>Debounced: {debouncedSearch}</p>
        <button onClick={toggle}>Toggle: {isOn ? 'ON' : 'OFF'}</button>
      </section>
    </div>
  );
}

export default HooksDemo;
```

## 🎯 Implementation Steps

1. **Install Dependencies**
   ```bash
   npm install react-router-dom @reduxjs/toolkit react-redux axios
   ```

2. **Create Directory Structure**
   ```bash
   mkdir -p src/{components/{common,game,forms,layout,hoc},pages,context,redux/slices,hooks,utils,services,routes}
   ```

3. **Implement Core Features**
   - Start with Context API (Theme & Auth)
   - Add Redux store and slices
   - Create custom hooks
   - Build page components
   - Add routing

4. **Add Comments**
   - Every file should have header comments
   - Explain interview-relevant concepts
   - Add inline comments for complex logic

5. **Test Everything**
   - Test all hooks
   - Verify routing
   - Check authentication flow
   - Test Redux actions

## 📚 Interview Questions to Practice

For each file, be ready to answer:
1. Why did you choose this approach?
2. What are the alternatives?
3. How would you optimize this?
4. What are the trade-offs?
5. How would you test this?

## 🚀 Next Steps

1. Review each file and understand the concepts
2. Practice explaining the code
3. Modify and experiment
4. Add your own features
5. Prepare for common interview questions

---

**Remember**: Understanding > Memorization

Focus on understanding WHY each pattern is used, not just HOW to implement it.