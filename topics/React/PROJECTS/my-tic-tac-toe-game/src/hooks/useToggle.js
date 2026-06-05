import { useState, useCallback } from 'react';

/**
 * CUSTOM HOOK: useToggle
 * Interview Topic: Custom Hooks & State Management
 * 
 * Purpose: Simple hook for boolean toggle state
 * Interview Points:
 * 1. Custom hooks for common patterns
 * 2. useCallback for memoization
 * 3. Multiple return values
 * 4. API design for hooks
 */

/**
 * useToggle Hook
 * 
 * @param {boolean} initialValue - Initial toggle state (default: false)
 * @returns {[boolean, Function, Function, Function]} - [value, toggle, setTrue, setFalse]
 * 
 * Interview: Explain hook API design and return value options
 */
function useToggle(initialValue = false) {
    // State for toggle value
    const [value, setValue] = useState(initialValue);

    /**
     * Toggle function - Flips the boolean value
     * Interview: Explain useCallback and when to use it
     * 
     * useCallback prevents function recreation on every render
     * Important when passing to child components or using in dependencies
     */
    const toggle = useCallback(() => {
        setValue(prev => !prev);
    }, []); // Empty deps - function never changes

    /**
     * Set to true
     * Interview: Explain providing multiple ways to update state
     */
    const setTrue = useCallback(() => {
        setValue(true);
    }, []);

    /**
     * Set to false
     */
    const setFalse = useCallback(() => {
        setValue(false);
    }, []);

    // Return array for easy destructuring
    // Interview: Explain array vs object return
    return [value, toggle, setTrue, setFalse];
}

export default useToggle;

/**
 * Usage Examples:
 *
 * // Example 1: Modal Toggle
 * function ModalExample() {
 *   const [isOpen, toggleModal, openModal, closeModal] = useToggle(false);
 *
 *   return (
 *     <div>
 *       <button onClick={openModal}>Open Modal</button>
 *       {isOpen && (
 *         <div className="modal">
 *           <h2>Modal Content</h2>
 *           <button onClick={closeModal}>Close</button>
 *         </div>
 *       )}
 *     </div>
 *   );
 * }
 *
 * // Example 2: Show/Hide Password
 * function PasswordInput() {
 *   const [showPassword, togglePassword] = useToggle(false);
 *
 *   return (
 *     <div>
 *       <input type={showPassword ? 'text' : 'password'} />
 *       <button onClick={togglePassword}>
 *         {showPassword ? 'Hide' : 'Show'}
 *       </button>
 *     </div>
 *   );
 * }
 *
 * // Example 3: Accordion/Collapsible
 * function Accordion({ title, children }) {
 *   const [isExpanded, toggleExpanded] = useToggle(false);
 *
 *   return (
 *     <div>
 *       <button onClick={toggleExpanded}>
 *         {title} {isExpanded ? '▼' : '▶'}
 *       </button>
 *       {isExpanded && <div>{children}</div>}
 *     </div>
 *   );
 * }
 *
 * // Example 4: Dark Mode Toggle
 * function ThemeToggle() {
 *   const [isDark, toggleTheme, enableDark, enableLight] = useToggle(false);
 *
 *   useEffect(() => {
 *     document.body.className = isDark ? 'dark-theme' : 'light-theme';
 *   }, [isDark]);
 *
 *   return (
 *     <div>
 *       <button onClick={toggleTheme}>
 *         Switch to {isDark ? 'Light' : 'Dark'} Mode
 *       </button>
 *       <button onClick={enableDark}>Force Dark</button>
 *       <button onClick={enableLight}>Force Light</button>
 *     </div>
 *   );
 * }
 *
 * // Example 5: Feature Flags
 * function FeatureToggle() {
 *   const [featureEnabled, toggleFeature] = useToggle(false);
 *
 *   return (
 *     <div>
 *       <label>
 *         <input
 *           type="checkbox"
 *           checked={featureEnabled}
 *           onChange={toggleFeature}
 *         />
 *         Enable New Feature
 *       </label>
 *       {featureEnabled && <NewFeatureComponent />}
 *     </div>
 *   );
 * }
 */

/**
 * Interview Questions to Prepare:
 *
 * Q1: Why create a custom hook for simple boolean toggle?
 * A: Benefits:
 *    - Reusable across components
 *    - Consistent API
 *    - Less boilerplate
 *    - Easier to test
 *    - Can add features (persistence, callbacks) later
 *
 * Q2: Why use useCallback in this hook?
 * A: - Prevents function recreation on every render
 *    - Important when passing to child components (prevents re-renders)
 *    - Useful when function is in dependency arrays
 *    - Improves performance in large apps
 *
 * Q3: Array vs Object return - Which is better?
 * A: Array return:
 *    - Flexible naming: [isOpen, toggle] or [show, setShow]
 *    - Order matters
 *    - Like useState
 *
 *    Object return:
 *    - Fixed names: { value, toggle }
 *    - Order doesn't matter
 *    - Self-documenting
 *
 *    Choose based on use case and team preference
 *
 * Q4: When should you NOT use useCallback?
 * A: Don't use when:
 *    - Function is not passed to child components
 *    - Function is not in dependency arrays
 *    - Premature optimization
 *    - Function body is very simple
 *    Remember: useCallback has its own cost
 *
 * Q5: How would you add persistence to this hook?
 * A: Combine with useLocalStorage:
 *    ```javascript
 *    function useToggle(key, initialValue) {
 *      const [value, setValue] = useLocalStorage(key, initialValue);
 *      const toggle = useCallback(() => setValue(v => !v), []);
 *      return [value, toggle];
 *    }
 *    ```
 *
 * Q6: How would you add a callback on toggle?
 * A: Add optional callback parameter:
 *    ```javascript
 *    const toggle = useCallback((callback) => {
 *      setValue(prev => {
 *        const newValue = !prev;
 *        callback?.(newValue);
 *        return newValue;
 *      });
 *    }, []);
 *    ```
 *
 * Q7: What are other common custom hooks?
 * A: - useDebounce - Delay value updates
 *    - useLocalStorage - Persist state
 *    - useFetch - Data fetching
 *    - useWindowSize - Track window dimensions
 *    - useOnClickOutside - Detect outside clicks
 *    - useKeyPress - Detect key presses
 *    - useInterval - setInterval with cleanup
 *
 * Q8: How do you test custom hooks?
 * A: Use @testing-library/react-hooks:
 *    ```javascript
 *    import { renderHook, act } from '@testing-library/react-hooks';
 *
 *    test('useToggle', () => {
 *      const { result } = renderHook(() => useToggle());
 *      expect(result.current[0]).toBe(false);
 *
 *      act(() => {
 *        result.current[1](); // toggle
 *      });
 *
 *      expect(result.current[0]).toBe(true);
 *    });
 *    ```
 *
 * Q9: What is the difference between custom hooks and HOCs?
 * A: Custom Hooks:
 *    - Use hooks inside
 *    - Return values/functions
 *    - Compose easily
 *    - Modern approach
 *
 *    HOCs (Higher-Order Components):
 *    - Wrap components
 *    - Return new component
 *    - Can cause wrapper hell
 *    - Legacy pattern
 *
 * Q10: Can you use hooks conditionally?
 * A: No! Hooks must be called:
 *    - At the top level (not in loops, conditions, nested functions)
 *    - In the same order every render
 *    - Only in React functions (components or custom hooks)
 *    This is the "Rules of Hooks"
 */

// Made with ❤️ for Interview Preparation
