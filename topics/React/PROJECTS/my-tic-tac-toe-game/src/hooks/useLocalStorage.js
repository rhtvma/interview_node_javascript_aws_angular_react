import { useState, useEffect } from 'react';

/**
 * CUSTOM HOOK: useLocalStorage
 * Interview Topic: Custom Hooks & Browser APIs
 * 
 * Purpose: Sync state with localStorage
 * Interview Points:
 * 1. Custom hooks pattern - Reusable logic
 * 2. localStorage API integration
 * 3. State synchronization
 * 4. Error handling
 * 5. JSON serialization
 * 
 * Benefits:
 * - Reusable across components
 * - Encapsulates localStorage logic
 * - Automatic persistence
 * - Type-safe with proper error handling
 */

/**
 * useLocalStorage Hook
 * 
 * @param {string} key - localStorage key
 * @param {any} initialValue - Default value if key doesn't exist
 * @returns {[any, Function]} - [storedValue, setValue]
 * 
 * Interview: Explain hook signature and return value
 */
function useLocalStorage(key, initialValue) {
  /**
   * State initialization with lazy function
   * Interview: Explain lazy initialization pattern
   * 
   * The function runs only once on mount, not on every render
   */
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from localStorage by key
      const item = window.localStorage.getItem(key);
      
      // Parse stored json or return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Interview: Explain error handling importance
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  /**
   * setValue function
   * Interview: Explain function overloading pattern
   * 
   * Accepts either a value or a function (like useState)
   */
  const setValue = (value) => {
    try {
      // Allow value to be a function (like useState)
      // Interview: Explain functional updates
      const valueToStore = value instanceof Function 
        ? value(storedValue) 
        : value;
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save to localStorage
      // Interview: Explain JSON.stringify for complex objects
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // Interview: Explain error scenarios (quota exceeded, etc.)
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  /**
   * Sync with localStorage changes from other tabs
   * Interview: Explain storage event and cross-tab communication
   */
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.error('Error parsing storage event:', error);
        }
      }
    };

    // Listen for storage changes
    window.addEventListener('storage', handleStorageChange);

    // Cleanup - Interview: Explain cleanup importance
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]);

  return [storedValue, setValue];
}

export default useLocalStorage;

/**
 * Usage Example:
 * 
 * function MyComponent() {
 *   const [name, setName] = useLocalStorage('name', 'Guest');
 *   const [settings, setSettings] = useLocalStorage('settings', {
 *     theme: 'light',
 *     notifications: true
 *   });
 * 
 *   return (
 *     <div>
 *       <input 
 *         value={name} 
 *         onChange={(e) => setName(e.target.value)} 
 *       />
 *       <button onClick={() => setSettings(prev => ({
 *         ...prev,
 *         theme: prev.theme === 'light' ? 'dark' : 'light'
 *       }))}>
 *         Toggle Theme
 *       </button>
 *     </div>
 *   );
 * }
 */

/**
 * Interview Questions to Prepare:
 * 
 * Q1: What are custom hooks and why create them?
 * A: Custom hooks are functions that use React hooks to encapsulate
 *    reusable logic. Benefits:
 *    - Code reuse across components
 *    - Separation of concerns
 *    - Easier testing
 *    - Better organization
 * 
 * Q2: What are the rules of hooks?
 * A: 1. Only call hooks at the top level (not in loops/conditions)
 *    2. Only call hooks from React functions (components or custom hooks)
 *    3. Custom hooks must start with "use"
 * 
 * Q3: How does localStorage work?
 * A: Browser API for storing key-value pairs persistently.
 *    - Synchronous API
 *    - Stores strings only (use JSON.stringify/parse)
 *    - ~5-10MB storage limit
 *    - Persists across sessions
 *    - Same-origin policy applies
 * 
 * Q4: What are localStorage limitations?
 * A: - Synchronous (can block main thread)
 *    - String-only storage
 *    - Size limits (~5-10MB)
 *    - No expiration mechanism
 *    - Vulnerable to XSS attacks
 *    - Not available in private browsing
 * 
 * Q5: How do you handle localStorage errors?
 * A: - Try-catch blocks
 *    - Check for quota exceeded errors
 *    - Fallback to in-memory storage
 *    - Validate data before storing
 *    - Handle JSON parse errors
 * 
 * Q6: What is the storage event?
 * A: Event fired when localStorage changes in another tab/window.
 *    Use for cross-tab communication and state synchronization.
 *    Note: Doesn't fire in the tab that made the change.
 * 
 * Q7: localStorage vs sessionStorage vs cookies?
 * A: localStorage: Persistent, ~5-10MB, client-only
 *    sessionStorage: Tab-scoped, cleared on close
 *    cookies: Sent with requests, ~4KB, can be httpOnly
 * 
 * Q8: How do you test custom hooks?
 * A: - Use @testing-library/react-hooks
 *    - Test with renderHook()
 *    - Mock localStorage
 *    - Test all edge cases
 *    - Test cleanup functions
 * 
 * Q9: What is lazy initialization in useState?
 * A: Pass a function to useState that runs only on initial render.
 *    Useful for expensive computations like reading from localStorage.
 *    Improves performance by avoiding repeated calculations.
 * 
 * Q10: How do you handle complex objects in localStorage?
 * A: - Use JSON.stringify to store
 *    - Use JSON.parse to retrieve
 *    - Handle circular references
 *    - Consider data size
 *    - Validate structure after parsing
 */

// Made with ❤️ for Interview Preparation
