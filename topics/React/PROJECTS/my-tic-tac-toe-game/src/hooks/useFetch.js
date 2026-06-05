import { useState, useEffect, useCallback } from 'react';

/**
 * CUSTOM HOOK: useFetch
 * Interview Topic: Custom Hooks & API Integration
 * 
 * Purpose: Reusable hook for fetching data from APIs
 * Interview Points:
 * 1. Custom hooks for data fetching
 * 2. Loading and error states
 * 3. Cleanup and memory leaks prevention
 * 4. useCallback for memoization
 * 5. AbortController for request cancellation
 */

/**
 * useFetch Hook
 * 
 * @param {string} url - API endpoint URL
 * @param {object} options - Fetch options (method, headers, body, etc.)
 * @returns {object} - { data, loading, error, refetch }
 * 
 * Interview: Explain hook design and return value structure
 */
function useFetch(url, options = {}) {
    // State management - Interview: Explain multiple state variables
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /**
     * Fetch function with AbortController
     * Interview: Explain AbortController and cleanup
     */
    const fetchData = useCallback(() => {
        // Create AbortController for cleanup
        const abortController = new AbortController();

        // Async function to perform the fetch
        const performFetch = async () => {
            try {
                // Reset states
                setLoading(true);
                setError(null);

                // Fetch with abort signal
                // Interview: Explain fetch API and signal
                const response = await fetch(url, {
                    ...options,
                    signal: abortController.signal
                });

                // Check response status
                // Interview: Explain HTTP status codes
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                // Parse JSON response
                const result = await response.json();

                // Update state with data
                setData(result);
                setError(null);
            } catch (err) {
                // Handle abort errors differently
                // Interview: Explain error handling patterns
                if (err.name === 'AbortError') {
                    console.log('Fetch aborted');
                } else {
                    setError(err.message);
                    setData(null);
                }
            } finally {
                // Always set loading to false
                setLoading(false);
            }
        };

        // Start the fetch
        performFetch();

        // Return cleanup function
        // Interview: Explain cleanup importance
        return () => {
            abortController.abort();
        };
    }, [url, options]); // Dependencies - Interview: Explain dependency array

    /**
     * Effect to fetch data on mount and when dependencies change
     * Interview: Explain useEffect and cleanup
     */
    useEffect(() => {
        // Call fetchData and get cleanup function synchronously
        const cleanup = fetchData();

        // Return cleanup function
        return cleanup;
    }, [fetchData]);

    /**
     * Refetch function for manual refresh
     * Interview: Explain manual refetch pattern
     */
    const refetch = useCallback(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch };
}

export default useFetch;

/**
 * Usage Examples:
 *
 * // Basic usage
 * function UserProfile() {
 *   const { data, loading, error } = useFetch('https://api.example.com/user/1');
 *
 *   if (loading) return <div>Loading...</div>;
 *   if (error) return <div>Error: {error}</div>;
 *   return <div>{data.name}</div>;
 * }
 *
 * // With options
 * function CreateUser() {
 *   const { data, loading, error, refetch } = useFetch(
 *     'https://api.example.com/users',
 *     {
 *       method: 'POST',
 *       headers: { 'Content-Type': 'application/json' },
 *       body: JSON.stringify({ name: 'John' })
 *     }
 *   );
 *
 *   return (
 *     <div>
 *       <button onClick={refetch}>Retry</button>
 *       {loading && <p>Creating user...</p>}
 *       {error && <p>Error: {error}</p>}
 *       {data && <p>User created: {data.id}</p>}
 *     </div>
 *   );
 * }
 */

/**
 * Interview Questions to Prepare:
 *
 * Q1: Why use custom hooks for data fetching?
 * A: Benefits:
 *    - Reusable across components
 *    - Encapsulates loading/error states
 *    - Handles cleanup automatically
 *    - Easier to test
 *    - Consistent error handling
 *
 * Q2: What is AbortController and why use it?
 * A: AbortController allows canceling fetch requests.
 *    Important for:
 *    - Preventing memory leaks
 *    - Avoiding state updates on unmounted components
 *    - Canceling outdated requests
 *    - Better performance
 *
 * Q3: How do you prevent memory leaks in React?
 * A: - Use cleanup functions in useEffect
 *    - Cancel pending requests on unmount
 *    - Clear timers and intervals
 *    - Remove event listeners
 *    - Check if component is mounted before setState
 *
 * Q4: What is useCallback and when to use it?
 * A: useCallback memoizes functions to prevent recreation on every render.
 *    Use when:
 *    - Passing callbacks to optimized child components
 *    - Function is a dependency in useEffect
 *    - Function is expensive to create
 *
 * Q5: How do you handle loading states?
 * A: - Set loading to true before fetch
 *    - Set to false in finally block
 *    - Show loading UI (spinner, skeleton)
 *    - Disable actions during loading
 *    - Consider optimistic updates
 *
 * Q6: How do you handle API errors?
 * A: - Try-catch blocks
 *    - Check response.ok
 *    - Parse error messages
 *    - Show user-friendly errors
 *    - Retry logic for transient errors
 *    - Log errors for debugging
 *
 * Q7: What are the alternatives to custom fetch hooks?
 * A: - React Query (TanStack Query)
 *    - SWR (Stale-While-Revalidate)
 *    - Apollo Client (for GraphQL)
 *    - RTK Query (Redux Toolkit)
 *    These provide caching, refetching, and more features
 *
 * Q8: How do you handle authentication in fetch?
 * A: - Add Authorization header with token
 *    - Use interceptors for automatic token injection
 *    - Handle 401 errors (refresh token or logout)
 *    - Store tokens securely
 *    - Consider token expiration
 *
 * Q9: What is the difference between useEffect and useLayoutEffect?
 * A: useEffect: Runs after paint (asynchronous)
 *    useLayoutEffect: Runs before paint (synchronous)
 *    Use useLayoutEffect for DOM measurements or mutations
 *
 * Q10: How do you implement request caching?
 * A: - Store responses in state/context
 *    - Use libraries like React Query
 *    - Implement cache invalidation
 *    - Set cache expiration
 *    - Consider stale-while-revalidate pattern
 *
 * Q11: What is the fetch API?
 * A: Modern browser API for making HTTP requests.
 *    Features:
 *    - Promise-based
 *    - Supports streaming
 *    - Better error handling than XMLHttpRequest
 *    - Works with Request/Response objects
 *    - Supports AbortController
 *
 * Q12: How do you handle race conditions?
 * A: - Use AbortController to cancel old requests
 *    - Track request IDs
 *    - Use latest flag pattern
 *    - Debounce/throttle requests
 *    - Use libraries like React Query
 */

// Made with Bob
