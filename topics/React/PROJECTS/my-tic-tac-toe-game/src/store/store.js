import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './slices/gameSlice';
import counterReducer from './slices/counterSlice';

/**
 * REDUX STORE - Interview Topic: Redux Toolkit
 * 
 * Purpose: Centralized state management using Redux Toolkit
 * Interview Points:
 * 1. Redux vs Context API - When to use each
 * 2. Redux Toolkit simplifies Redux setup
 * 3. Store configuration with configureStore
 * 4. Multiple reducers (slices)
 * 5. DevTools integration (automatic)
 * 
 * Redux Toolkit Benefits:
 * - Less boilerplate code
 * - Built-in Immer for immutable updates
 * - Redux DevTools configured automatically
 * - createSlice combines actions and reducers
 */

/**
 * Configure Store
 * Interview: Explain store configuration and middleware
 * 
 * configureStore automatically:
 * - Sets up Redux DevTools
 * - Adds thunk middleware
 * - Enables Redux DevTools Extension
 * - Adds development checks
 */
const store = configureStore({
    reducer: {
        // Add reducers here - Interview: Explain reducer composition
        game: gameReducer,      // Tic-tac-toe game state
        counter: counterReducer // Counter example for demos
    },

    // Middleware - Interview: Explain middleware purpose
    // Default middleware includes thunk for async actions
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            // Serializable check - Interview: Explain why state should be serializable
            serializableCheck: {
                // Ignore these action types
                ignoredActions: ['game/setCustomData'],
                // Ignore these field paths in all actions
                ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
                // Ignore these paths in the state
                ignoredPaths: ['game.customData']
            }
        }),

    // DevTools - Interview: Explain debugging with Redux DevTools
    devTools: import.meta.env.MODE !== 'production'
});

/**
 * Export store and types
 * Interview: Explain TypeScript integration (if using TS)
 */
export default store;

// Export types for TypeScript (optional but good practice)
export const RootState = store.getState;
export const AppDispatch = store.dispatch;

/**
 * Interview Questions to Prepare:
 *
 * Q1: What is Redux and when should you use it?
 * A: Redux is a predictable state container for JavaScript apps.
 *    Use when:
 *    - Complex state logic
 *    - State needed across many components
 *    - State updates are frequent
 *    - Need time-travel debugging
 *    - Large team needs predictable patterns
 *
 * Q2: Redux vs Context API - When to use which?
 * A: Context API:
 *    - Simple global state (theme, auth)
 *    - Infrequent updates
 *    - Small to medium apps
 *
 *    Redux:
 *    - Complex state logic
 *    - Frequent updates
 *    - Need middleware (logging, async)
 *    - Time-travel debugging
 *    - Large applications
 *
 * Q3: What is Redux Toolkit and why use it?
 * A: Official, opinionated Redux toolset that:
 *    - Reduces boilerplate (no action types, action creators)
 *    - Includes Immer for immutable updates
 *    - Configures store with good defaults
 *    - Includes Redux Thunk
 *    - Better TypeScript support
 *
 * Q4: What are Redux middleware?
 * A: Functions that intercept actions before they reach reducers.
 *    Use cases:
 *    - Logging (redux-logger)
 *    - Async operations (redux-thunk, redux-saga)
 *    - API calls
 *    - Analytics
 *    - Error reporting
 *
 * Q5: What is the Redux data flow?
 * A: 1. Component dispatches action
 *    2. Action goes through middleware
 *    3. Reducer processes action and updates state
 *    4. Store notifies subscribers
 *    5. Component re-renders with new state
 *
 * Q6: What are Redux DevTools?
 * A: Browser extension for debugging Redux:
 *    - Inspect actions and state
 *    - Time-travel debugging
 *    - Action replay
 *    - State diff visualization
 *    - Export/import state
 *
 * Q7: What is a Redux slice?
 * A: Redux Toolkit concept that combines:
 *    - Initial state
 *    - Reducers
 *    - Action creators
 *    All in one file using createSlice()
 *
 * Q8: How do you handle async operations in Redux?
 * A: Use Redux Thunk (included in Redux Toolkit):
 *    - Create async thunk with createAsyncThunk
 *    - Handle pending/fulfilled/rejected states
 *    - Dispatch actions from thunk
 *    Alternative: Redux Saga for complex async flows
 */

// Made with Bob
