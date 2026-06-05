import { useState, useEffect } from 'react';
import { ThemeContext } from './themeContextDefinition';

/**
 * THEME CONTEXT - Interview Topic: Context API
 *
 * Purpose: Demonstrates Context API for global state management
 * Interview Points:
 * 1. Context API vs Props Drilling - Avoids passing props through multiple levels
 * 2. Provider Pattern - Wraps app to provide theme to all components
 * 3. Custom Hook Pattern - useTheme() for easy consumption (see hooks/useTheme.js)
 * 4. Local Storage Integration - Persists user preference
 * 5. Fast Refresh Compliance - Context and hooks in separate files
 *
 * When to use Context API:
 * - Global state (theme, auth, language)
 * - Avoid prop drilling
 * - State that doesn't change frequently
 */

/**
 * Theme Provider Component
 * Interview: Explain Provider pattern and value prop
 */
export const ThemeProvider = ({ children }) => {
    // State Management - Interview: Explain useState hook
    const [theme, setTheme] = useState(() => {
        // Initialize from localStorage - Interview: Explain lazy initialization
        const savedTheme = localStorage.getItem('theme');
        return savedTheme || 'light';
    });

    // Side Effect - Interview: Explain useEffect for localStorage sync
    useEffect(() => {
        // Persist theme preference
        localStorage.setItem('theme', theme);

        // Apply theme to document - Interview: Explain DOM manipulation in React
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]); // Dependency array - Interview: Explain when effect runs

    /**
     * Toggle Theme Function
     * Interview: Explain state update patterns
     */
    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    // Context Value - Interview: Explain what gets shared
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

/**
 * Interview Questions to Prepare:
 *
 * Q1: What is Context API and when should you use it?
 * A: Context API provides a way to share data across component tree without prop drilling.
 *    Use for: global state (theme, auth, language), infrequently changing data.
 *
 * Q2: What's the difference between Context API and Redux?
 * A: Context API: Built-in, simpler, good for simple global state
 *    Redux: More powerful, better DevTools, middleware support, time-travel debugging
 *
 * Q3: Why create a custom hook for context?
 * A: Encapsulation, error handling, cleaner component code, easier testing
 *
 * Q4: What are the performance considerations with Context?
 * A: All consumers re-render when context value changes. Solutions:
 *    - Split contexts by update frequency
 *    - Use React.memo for consumers
 *    - Use useMemo for context value
 *
 * Q5: How does lazy initialization work in useState?
 * A: Pass a function to useState - it runs only on initial render, not on re-renders.
 *    Good for expensive computations like reading from localStorage.
 *
 * Q6: Why is Fast Refresh important?
 * A: Fast Refresh preserves component state during development, making the dev experience
 *    smoother. Files should only export components to enable this feature properly.
 */

// Made with ❤️ for Interview Preparation
