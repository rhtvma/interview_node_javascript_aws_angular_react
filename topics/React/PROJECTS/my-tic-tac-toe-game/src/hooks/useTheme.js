import { useContext } from 'react';
import { ThemeContext } from '../contexts/themeContextDefinition';

/**
 * Custom Hook for Theme Context
 * Interview Points:
 * 1. Custom hooks start with 'use'
 * 2. Encapsulates context consumption logic
 * 3. Provides better error handling
 * 4. Makes component code cleaner
 */
export const useTheme = () => {
    const context = useContext(ThemeContext);

    // Error handling - Interview: Explain why this is important
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }

    return context;
};

// Made with Bob
