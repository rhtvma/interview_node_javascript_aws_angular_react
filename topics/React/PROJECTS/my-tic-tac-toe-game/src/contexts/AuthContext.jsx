import { useState, useEffect } from 'react';
import { AuthContext } from './authContextDefinition';

/**
 * AUTH CONTEXT - Interview Topic: Authentication & Context API
 *
 * Purpose: Demonstrates authentication flow using Context API
 * Interview Points:
 * 1. Authentication state management
 * 2. Token-based authentication
 * 3. Protected routes implementation
 * 4. Login/Logout flow
 * 5. Persistent sessions with localStorage
 *
 * Real-world use cases:
 * - User authentication
 * - Role-based access control
 * - Session management
 */

/**
 * Auth Provider Component
 * Interview: Explain authentication flow and state management
 */
export const AuthProvider = ({ children }) => {
    // User state - Interview: Explain state structure
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Initialize auth state from localStorage
    useEffect(() => {
        const initAuth = () => {
            try {
                const storedUser = localStorage.getItem('user');
                const token = localStorage.getItem('token');

                if (storedUser && token) {
                    setUser(JSON.parse(storedUser));
                }
            } catch (error) {
                console.error('Auth initialization error:', error);
                // Clear invalid data
                localStorage.removeItem('user');
                localStorage.removeItem('token');
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, []);

    /**
     * Login Function
     * Interview: Explain async operations and error handling
     * 
     * In real app, this would:
     * 1. Call API with credentials
     * 2. Receive JWT token
     * 3. Store token and user data
     * 4. Redirect to dashboard
     */
    const login = async (email, password) => {
        try {
            // Simulate API call - Interview: Explain Promise and async/await
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Mock authentication - Interview: In real app, validate with backend
            if (email && password) {
                const mockUser = {
                    id: '1',
                    email: email,
                    name: email.split('@')[0],
                    role: 'user'
                };

                const mockToken = 'mock-jwt-token-' + Date.now();

                // Store in state
                setUser(mockUser);

                // Persist in localStorage - Interview: Explain persistence strategy
                localStorage.setItem('user', JSON.stringify(mockUser));
                localStorage.setItem('token', mockToken);

                return { success: true, user: mockUser };
            }

            throw new Error('Invalid credentials');
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: error.message };
        }
    };

    /**
     * Logout Function
     * Interview: Explain cleanup and state reset
     */
    const logout = () => {
        // Clear state
        setUser(null);

        // Clear localStorage - Interview: Explain security considerations
        localStorage.removeItem('user');
        localStorage.removeItem('token');

        // In real app: Invalidate token on server, clear cookies, etc.
    };

    /**
     * Register Function
     * Interview: Explain user registration flow
     */
    const register = async (email, password, name) => {
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Mock registration
            const mockUser = {
                id: Date.now().toString(),
                email,
                name,
                role: 'user'
            };

            const mockToken = 'mock-jwt-token-' + Date.now();

            setUser(mockUser);
            localStorage.setItem('user', JSON.stringify(mockUser));
            localStorage.setItem('token', mockToken);

            return { success: true, user: mockUser };
        } catch (error) {
            console.error('Registration error:', error);
            return { success: false, error: error.message };
        }
    };

    /**
     * Update User Function
     * Interview: Explain state updates and optimistic UI
     */
    const updateUser = (updates) => {
        const updatedUser = { ...user, ...updates };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
    };

    // Context value - Interview: Explain what gets exposed
    const value = {
        user,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
        register,
        updateUser
    };

    // Show loading state - Interview: Explain loading patterns
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

/**
 * Interview Questions to Prepare:
 *
 * Q1: How do you implement authentication in React?
 * A: Use Context API or Redux for auth state, store JWT tokens,
 *    implement protected routes, handle token refresh, secure storage.
 *
 * Q2: Where should you store JWT tokens?
 * A: Options:
 *    - localStorage: Simple but vulnerable to XSS
 *    - sessionStorage: Cleared on tab close
 *    - httpOnly cookies: Most secure, immune to XSS
 *    - Memory: Most secure but lost on refresh
 *
 * Q3: How do you protect routes in React?
 * A: Create ProtectedRoute component that checks auth state,
 *    redirects to login if not authenticated, wraps protected components.
 *
 * Q4: What is token refresh and why is it needed?
 * A: JWT tokens expire for security. Refresh tokens allow getting new
 *    access tokens without re-login. Implement silent refresh before expiry.
 *
 * Q5: How do you handle authentication errors?
 * A: Try-catch blocks, error boundaries, user feedback, automatic logout
 *    on 401 errors, retry logic for network failures.
 *
 * Q6: What security considerations are important?
 * A: - XSS protection (sanitize inputs)
 *    - CSRF protection (tokens)
 *    - Secure token storage
 *    - HTTPS only
 *    - Token expiration
 *    - Logout on suspicious activity
 */

// Made with ❤️ for Interview Preparation
