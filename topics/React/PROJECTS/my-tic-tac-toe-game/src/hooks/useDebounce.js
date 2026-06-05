import { useState, useEffect } from 'react';

/**
 * CUSTOM HOOK: useDebounce
 * Interview Topic: Performance Optimization & Custom Hooks
 * 
 * Purpose: Delay updating a value until after a specified time
 * Interview Points:
 * 1. Debouncing concept and use cases
 * 2. Performance optimization
 * 3. useEffect with cleanup
 * 4. setTimeout management
 * 5. Real-world applications (search, resize, scroll)
 */

/**
 * useDebounce Hook
 * 
 * @param {any} value - Value to debounce
 * @param {number} delay - Delay in milliseconds (default: 500ms)
 * @returns {any} - Debounced value
 * 
 * Interview: Explain debouncing vs throttling
 * 
 * Debouncing: Delays execution until after a period of inactivity
 * Throttling: Limits execution to once per time period
 */
function useDebounce(value, delay = 500) {
  // State to store debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    /**
     * Set timeout to update debounced value
     * Interview: Explain setTimeout and closure
     */
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    /**
     * Cleanup function
     * Interview: Explain why cleanup is crucial
     * 
     * Clears timeout if value changes before delay expires
     * Prevents memory leaks and stale updates
     */
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Re-run effect when value or delay changes

  return debouncedValue;
}

export default useDebounce;

/**
 * Usage Examples:
 * 
 * // Example 1: Search Input
 * function SearchComponent() {
 *   const [searchTerm, setSearchTerm] = useState('');
 *   const debouncedSearchTerm = useDebounce(searchTerm, 500);
 * 
 *   useEffect(() => {
 *     if (debouncedSearchTerm) {
 *       // API call only happens after user stops typing for 500ms
 *       fetchSearchResults(debouncedSearchTerm);
 *     }
 *   }, [debouncedSearchTerm]);
 * 
 *   return (
 *     <input
 *       value={searchTerm}
 *       onChange={(e) => setSearchTerm(e.target.value)}
 *       placeholder="Search..."
 *     />
 *   );
 * }
 * 
 * // Example 2: Window Resize
 * function ResponsiveComponent() {
 *   const [windowSize, setWindowSize] = useState({
 *     width: window.innerWidth,
 *     height: window.innerHeight
 *   });
 *   const debouncedSize = useDebounce(windowSize, 300);
 * 
 *   useEffect(() => {
 *     const handleResize = () => {
 *       setWindowSize({
 *         width: window.innerWidth,
 *         height: window.innerHeight
 *       });
 *     };
 * 
 *     window.addEventListener('resize', handleResize);
 *     return () => window.removeEventListener('resize', handleResize);
 *   }, []);
 * 
 *   // Use debouncedSize for expensive calculations
 *   return <div>Width: {debouncedSize.width}</div>;
 * }
 * 
 * // Example 3: Form Validation
 * function EmailInput() {
 *   const [email, setEmail] = useState('');
 *   const debouncedEmail = useDebounce(email, 500);
 *   const [isValid, setIsValid] = useState(null);
 * 
 *   useEffect(() => {
 *     if (debouncedEmail) {
 *       // Validate email after user stops typing
 *       const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(debouncedEmail);
 *       setIsValid(valid);
 *     }
 *   }, [debouncedEmail]);
 * 
 *   return (
 *     <div>
 *       <input
 *         value={email}
 *         onChange={(e) => setEmail(e.target.value)}
 *       />
 *       {isValid !== null && (
 *         <span>{isValid ? '✓ Valid' : '✗ Invalid'}</span>
 *       )}
 *     </div>
 *   );
 * }
 */

/**
 * Interview Questions to Prepare:
 * 
 * Q1: What is debouncing and when to use it?
 * A: Debouncing delays function execution until after a period of inactivity.
 *    Use cases:
 *    - Search input (wait for user to stop typing)
 *    - Window resize events
 *    - Scroll events
 *    - Form validation
 *    - Auto-save functionality
 * 
 * Q2: Debouncing vs Throttling - What's the difference?
 * A: Debouncing: Delays execution until inactivity period ends
 *    - Example: Search after user stops typing
 *    
 *    Throttling: Limits execution to once per time period
 *    - Example: Track scroll position every 100ms
 *    
 *    Choose based on use case:
 *    - Debounce: When you want the final value
 *    - Throttle: When you want regular updates
 * 
 * Q3: How does useDebounce improve performance?
 * A: - Reduces number of expensive operations (API calls, calculations)
 *    - Prevents excessive re-renders
 *    - Improves user experience (less lag)
 *    - Reduces server load
 *    - Saves bandwidth
 * 
 * Q4: What happens if the component unmounts during debounce?
 * A: The cleanup function clears the timeout, preventing:
 *    - Memory leaks
 *    - setState on unmounted component warnings
 *    - Unnecessary operations
 * 
 * Q5: Can you implement debounce without a custom hook?
 * A: Yes, using lodash.debounce or manual implementation:
 *    ```javascript
 *    const debouncedFn = debounce((value) => {
 *      // Do something
 *    }, 500);
 *    ```
 *    But custom hook provides better React integration
 * 
 * Q6: How do you test debounced functions?
 * A: - Use fake timers (jest.useFakeTimers())
 *    - Fast-forward time (jest.advanceTimersByTime())
 *    - Test that function isn't called immediately
 *    - Test that function is called after delay
 *    - Test cleanup on unmount
 * 
 * Q7: What are the trade-offs of debouncing?
 * A: Pros:
 *    - Better performance
 *    - Reduced API calls
 *    - Better UX for some cases
 *    
 *    Cons:
 *    - Delayed feedback
 *    - Complexity
 *    - May feel sluggish if delay is too long
 * 
 * Q8: How do you choose the right delay value?
 * A: Consider:
 *    - User typing speed (~300-500ms for search)
 *    - Network latency
 *    - User expectations
 *    - Type of operation (fast vs slow)
 *    - Test with real users
 * 
 * Q9: Can you debounce multiple values independently?
 * A: Yes, call useDebounce multiple times:
 *    ```javascript
 *    const debouncedName = useDebounce(name, 500);
 *    const debouncedEmail = useDebounce(email, 500);
 *    ```
 *    Each has independent timers
 * 
 * Q10: What other performance optimization techniques exist?
 * A: - Memoization (useMemo, useCallback, React.memo)
 *    - Virtualization (react-window, react-virtualized)
 *    - Code splitting (React.lazy, Suspense)
 *    - Throttling
 *    - Web Workers for heavy computations
 *    - Pagination/Infinite scroll
 *    - Image lazy loading
 * 
 * Q11: How does closure work in the cleanup function?
 * A: The cleanup function has access to the `handler` variable
 *    from its outer scope (closure). This allows it to clear
 *    the specific timeout even after the effect function completes.
 * 
 * Q12: What happens if delay changes?
 * A: The effect re-runs because delay is in the dependency array.
 *    The old timeout is cleared and a new one is set with the new delay.
 */

// Made with ❤️ for Interview Preparation
