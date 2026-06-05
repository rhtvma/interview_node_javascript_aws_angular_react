import { useContext } from 'react';
import { AuthContext } from '../contexts/authContextDefinition';

/**
 * Custom Hook for Auth Context
 * Interview: Explain custom hooks pattern
 *
 * Separated into its own file to comply with Fast Refresh requirements.
 * Fast Refresh works best when files only export components.
 */
export const useAuth = () => {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};

// Made with ❤️ for Interview Preparation
