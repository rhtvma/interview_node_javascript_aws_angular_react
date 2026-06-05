import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

/**
 * PROTECTED ROUTE COMPONENT
 * Interview Topic: Route Protection & Authentication
 * 
 * Purpose: Protect routes that require authentication
 * Interview Points:
 * 1. Route protection pattern
 * 2. Conditional rendering
 * 3. React Router Navigate component
 * 4. Authentication flow
 * 5. Redirect with state
 */

/**
 * ProtectedRoute Component
 * 
 * @param {object} props - Component props
 * @param {ReactNode} props.children - Child components to render if authenticated
 * @returns {ReactNode} - Children or redirect to login
 * 
 * Interview: Explain route protection implementation
 */
function ProtectedRoute({ children }) {
  // Get auth state from context
  // Interview: Explain context consumption
  const { isAuthenticated, loading } = useAuth();

  // Show loading state while checking authentication
  // Interview: Explain loading state importance
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  // Interview: Explain Navigate component and state
  if (!isAuthenticated) {
    // Pass current location in state to redirect back after login
    return <Navigate to="/login" state={{ from: window.location.pathname }} replace />;
  }

  // Render children if authenticated
  // Interview: Explain children prop pattern
  return children;
}

export default ProtectedRoute;

/**
 * Usage Example:
 * 
 * import { BrowserRouter, Routes, Route } from 'react-router-dom';
 * import ProtectedRoute from './components/ProtectedRoute';
 * 
 * function App() {
 *   return (
 *     <BrowserRouter>
 *       <Routes>
 *         <Route path="/login" element={<Login />} />
 *         <Route path="/public" element={<PublicPage />} />
 *         
 *         {/* Protected Routes *\/}
 *         <Route 
 *           path="/dashboard" 
 *           element={
 *             <ProtectedRoute>
 *               <Dashboard />
 *             </ProtectedRoute>
 *           } 
 *         />
 *         
 *         <Route 
 *           path="/profile" 
 *           element={
 *             <ProtectedRoute>
 *               <Profile />
 *             </ProtectedRoute>
 *           } 
 *         />
 *       </Routes>
 *     </BrowserRouter>
 *   );
 * }
 */

/**
 * Alternative Implementation with Role-Based Access:
 * 
 * function ProtectedRoute({ children, requiredRole }) {
 *   const { user, isAuthenticated, loading } = useAuth();
 * 
 *   if (loading) return <div>Loading...</div>;
 *   
 *   if (!isAuthenticated) {
 *     return <Navigate to="/login" replace />;
 *   }
 *   
 *   // Check role if required
 *   if (requiredRole && user.role !== requiredRole) {
 *     return <Navigate to="/unauthorized" replace />;
 *   }
 *   
 *   return children;
 * }
 * 
 * // Usage:
 * <ProtectedRoute requiredRole="admin">
 *   <AdminPanel />
 * </ProtectedRoute>
 */

/**
 * Interview Questions to Prepare:
 * 
 * Q1: How do you implement route protection in React?
 * A: Create a ProtectedRoute component that:
 *    1. Checks authentication state
 *    2. Redirects to login if not authenticated
 *    3. Renders children if authenticated
 *    4. Handles loading states
 *    5. Preserves redirect location
 * 
 * Q2: What is the Navigate component in React Router?
 * A: Navigate is a component that redirects to a different route.
 *    - Declarative alternative to useNavigate hook
 *    - Use 'replace' prop to replace history entry
 *    - Can pass state for redirect information
 *    - Triggers on render
 * 
 * Q3: Why pass location state during redirect?
 * A: To redirect user back to original destination after login.
 *    Example flow:
 *    1. User tries to access /dashboard
 *    2. Not authenticated, redirect to /login with state
 *    3. After login, redirect back to /dashboard
 * 
 * Q4: What is the 'replace' prop in Navigate?
 * A: replace={true} replaces current history entry instead of adding new one.
 *    Benefits:
 *    - Prevents back button from going to protected route
 *    - Cleaner navigation history
 *    - Better UX for redirects
 * 
 * Q5: How do you implement role-based access control?
 * A: - Store user role in auth context
 *    - Check role in ProtectedRoute
 *    - Redirect to unauthorized page if role doesn't match
 *    - Can have multiple role levels (admin, user, guest)
 * 
 * Q6: What are the security considerations?
 * A: - Never trust client-side checks alone
 *    - Always validate on backend
 *    - Use JWT tokens with expiration
 *    - Implement token refresh
 *    - Clear sensitive data on logout
 *    - Use HTTPS
 *    - Implement CSRF protection
 * 
 * Q7: How do you handle token expiration?
 * A: - Check token expiry before requests
 *    - Implement silent refresh
 *    - Redirect to login on 401 errors
 *    - Show session timeout warning
 *    - Clear auth state on expiry
 * 
 * Q8: What is the children prop pattern?
 * A: Pattern where component receives child elements as props.
 *    Benefits:
 *    - Flexible composition
 *    - Wrapper components
 *    - Conditional rendering
 *    - Layout components
 * 
 * Q9: How do you test protected routes?
 * A: - Mock auth context
 *    - Test authenticated access
 *    - Test unauthenticated redirect
 *    - Test loading state
 *    - Test role-based access
 *    - Use React Testing Library
 * 
 * Q10: What are alternatives to this pattern?
 * A: - Higher-Order Components (HOC)
 *    - Custom hooks (useRequireAuth)
 *    - Route middleware (in frameworks like Next.js)
 *    - Server-side rendering with auth checks
 * 
 * Q11: How do you handle multiple protection levels?
 * A: Create different ProtectedRoute variants:
 *    - PublicRoute (redirect if authenticated)
 *    - PrivateRoute (require authentication)
 *    - AdminRoute (require admin role)
 *    - GuestRoute (only for non-authenticated)
 * 
 * Q12: What is the difference between Navigate and useNavigate?
 * A: Navigate: Component-based, declarative, renders redirect
 *    useNavigate: Hook-based, imperative, programmatic navigation
 *    
 *    Use Navigate for: Conditional redirects, route protection
 *    Use useNavigate for: Event handlers, after form submission
 */

// Made with Bob
