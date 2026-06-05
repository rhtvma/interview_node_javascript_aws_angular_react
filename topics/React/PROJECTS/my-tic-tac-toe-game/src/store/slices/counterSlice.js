import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

/**
 * COUNTER SLICE - Interview Topic: Redux Async Operations
 * 
 * Purpose: Demonstrates async operations with Redux Toolkit
 * Interview Points:
 * 1. createAsyncThunk for async operations
 * 2. Handling loading states
 * 3. Error handling in Redux
 * 4. Pending/Fulfilled/Rejected states
 * 5. extraReducers for async actions
 */

/**
 * Async Thunk - Simulates API call
 * Interview: Explain createAsyncThunk and async patterns
 * 
 * createAsyncThunk automatically generates:
 * - pending action type
 * - fulfilled action type
 * - rejected action type
 */
export const incrementAsync = createAsyncThunk(
    'counter/incrementAsync',
    async (amount, { rejectWithValue }) => {
        try {
            // Simulate API call - Interview: Explain async/await
            await new Promise(resolve => setTimeout(resolve, 1000));

            // In real app: const response = await api.increment(amount);
            return amount;
        } catch (error) {
            // Interview: Explain error handling in thunks
            return rejectWithValue(error.message);
        }
    }
);

/**
 * Fetch Counter Value - Another async example
 * Interview: Explain multiple async operations
 */
export const fetchCounterValue = createAsyncThunk(
    'counter/fetchValue',
    async (_, { rejectWithValue }) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            // Simulate fetching from API
            return Math.floor(Math.random() * 100);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

/**
 * Initial State
 * Interview: Explain state shape for async operations
 */
const initialState = {
    value: 0,
    loading: false,      // Loading state for async operations
    error: null,         // Error state
    history: []          // History of values
};

/**
 * Counter Slice
 * Interview: Explain slice with sync and async reducers
 */
const counterSlice = createSlice({
    name: 'counter',
    initialState,

    /**
     * Synchronous Reducers
     * Interview: Explain sync vs async reducers
     */
    reducers: {
        increment: (state) => {
            state.value += 1;
            state.history.push({ value: state.value, timestamp: Date.now() });
        },

        decrement: (state) => {
            state.value -= 1;
            state.history.push({ value: state.value, timestamp: Date.now() });
        },

        incrementByAmount: (state, action) => {
            state.value += action.payload;
            state.history.push({ value: state.value, timestamp: Date.now() });
        },

        reset: (state) => {
            state.value = 0;
            state.error = null;
            state.history = [];
        },

        clearError: (state) => {
            state.error = null;
        }
    },

    /**
     * Extra Reducers - For async actions
     * Interview: Explain extraReducers and builder pattern
     * 
     * extraReducers handle actions from createAsyncThunk
     * Builder pattern provides type safety
     */
    extraReducers: (builder) => {
        // incrementAsync cases
        builder
            .addCase(incrementAsync.pending, (state) => {
                // Interview: Explain loading state management
                state.loading = true;
                state.error = null;
            })
            .addCase(incrementAsync.fulfilled, (state, action) => {
                // Interview: Explain fulfilled state handling
                state.loading = false;
                state.value += action.payload;
                state.history.push({
                    value: state.value,
                    timestamp: Date.now(),
                    async: true
                });
            })
            .addCase(incrementAsync.rejected, (state, action) => {
                // Interview: Explain error state handling
                state.loading = false;
                state.error = action.payload || 'Failed to increment';
            })

            // fetchCounterValue cases
            .addCase(fetchCounterValue.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCounterValue.fulfilled, (state, action) => {
                state.loading = false;
                state.value = action.payload;
                state.history.push({
                    value: state.value,
                    timestamp: Date.now(),
                    fetched: true
                });
            })
            .addCase(fetchCounterValue.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch value';
            });
    }
});

/**
 * Export Actions
 * Interview: Explain action exports
 */
export const {
    increment,
    decrement,
    incrementByAmount,
    reset,
    clearError
} = counterSlice.actions;

/**
 * Selectors
 * Interview: Explain selector pattern
 */
export const selectCounterValue = (state) => state.counter.value;
export const selectCounterLoading = (state) => state.counter.loading;
export const selectCounterError = (state) => state.counter.error;
export const selectCounterHistory = (state) => state.counter.history;

/**
 * Complex Selector - Derived state
 * Interview: Explain computed/derived state
 */
export const selectCounterStats = (state) => ({
    current: state.counter.value,
    isPositive: state.counter.value > 0,
    isNegative: state.counter.value < 0,
    historyCount: state.counter.history.length,
    lastChange: state.counter.history[state.counter.history.length - 1]
});

/**
 * Export Reducer
 */
export default counterSlice.reducer;

/**
 * Interview Questions to Prepare:
 *
 * Q1: What is createAsyncThunk and when to use it?
 * A: createAsyncThunk is a Redux Toolkit function for handling async logic.
 *    It automatically generates pending/fulfilled/rejected action types.
 *    Use for: API calls, async operations, side effects
 *
 * Q2: How do you handle loading states in Redux?
 * A: Add loading boolean to state, set to true on pending,
 *    false on fulfilled/rejected. Show loading UI based on this state.
 *
 * Q3: What are the three states of an async operation?
 * A: 1. Pending - Operation started, waiting for result
 *    2. Fulfilled - Operation succeeded, have result
 *    3. Rejected - Operation failed, have error
 *
 * Q4: How do you handle errors in Redux?
 * A: - Add error field to state
 *    - Set error in rejected case
 *    - Use rejectWithValue for custom error payloads
 *    - Clear error on new operations or user action
 *    - Show error UI to user
 *
 * Q5: What is the builder pattern in extraReducers?
 * A: Builder pattern provides type-safe way to add cases for actions.
 *    Use addCase() to handle specific action types.
 *    Better than object notation for TypeScript.
 *
 * Q6: How do you cancel async operations?
 * A: - Use AbortController with fetch
 *    - Check if component is mounted
 *    - Use cleanup in useEffect
 *    - Redux Toolkit provides abort() method on thunks
 *
 * Q7: What are derived/computed selectors?
 * A: Selectors that compute values from state rather than storing them.
 *    Benefits: No redundant state, always in sync, can be memoized.
 *    Use reselect library for memoization.
 *
 * Q8: How do you test async Redux logic?
 * A: - Mock API calls
 *    - Test action creators
 *    - Test reducers with different action types
 *    - Test thunks with mock store
 *    - Use Redux Toolkit's configureStore for tests
 *
 * Q9: What is the difference between reducers and extraReducers?
 * A: reducers: Define actions for this slice
 *    extraReducers: Handle actions from other slices or async thunks
 *
 * Q10: How do you handle optimistic updates?
 * A: Update state immediately (optimistic), then:
 *    - If API succeeds: Keep the update
 *    - If API fails: Revert the update, show error
 *    Improves perceived performance
 */

// Made with Bob
