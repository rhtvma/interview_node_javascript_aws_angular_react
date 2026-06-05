import { createContext } from 'react';

/**
 * Theme Context Definition
 * 
 * Separated from ThemeProvider to comply with Fast Refresh rules.
 * Fast Refresh works best when files only export components.
 */
export const ThemeContext = createContext(undefined);

// Made with ❤️ for Interview Preparation
