import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';

/**
 * HOME PAGE COMPONENT - Modern Tile-Based Layout
 * Interview Topic: Component Composition, Context Usage, Tailwind CSS
 * 
 * Features:
 * - Responsive grid layout
 * - Gradient backgrounds
 * - Hover animations
 * - Dark mode support
 * - Icon integration
 */

function Home() {
  const { theme, toggleTheme, isDark } = useTheme();
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8">
        {/* Header with Theme Toggle */}
        <div className="flex justify-between items-center mb-12">
          <div className="animate-fadeIn">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              React Interview Ready
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Master React concepts with hands-on examples
            </p>
          </div>
          
          <button
            onClick={toggleTheme}
            className="p-4 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
            aria-label="Toggle theme"
          >
            <span className="text-2xl">
              {isDark ? '☀️' : '🌙'}
            </span>
          </button>
        </div>

        {/* Welcome Card */}
        <div className="mb-12 p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-xl border-l-4 border-purple-500 animate-fadeIn">
          {isAuthenticated ? (
            <div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                Welcome back, {user?.name || user?.email}! 👋
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Continue your React learning journey
              </p>
            </div>
          ) : (
            <div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                Welcome to React Learning Hub! 🚀
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Login to unlock all features and track your progress
              </p>
            </div>
          )}
        </div>

        {/* Feature Cards Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
            🎯 Explore Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Game Card */}
            <Link to="/game" className="group">
              <div className="h-full p-6 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  🎮
                </div>
                <h3 className="text-2xl font-bold mb-2">Tic-Tac-Toe</h3>
                <p className="text-blue-100 mb-4">
                  Redux state management with game logic
                </p>
                <div className="flex items-center text-sm font-semibold">
                  <span>Play Now</span>
                  <span className="ml-2 group-hover:translate-x-2 transition-transform duration-300">→</span>
                </div>
              </div>
            </Link>

            {/* Hooks Card */}
            <Link to="/hooks" className="group">
              <div className="h-full p-6 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  🪝
                </div>
                <h3 className="text-2xl font-bold mb-2">React Hooks</h3>
                <p className="text-purple-100 mb-4">
                  All hooks with practical examples
                </p>
                <div className="flex items-center text-sm font-semibold">
                  <span>Explore Hooks</span>
                  <span className="ml-2 group-hover:translate-x-2 transition-transform duration-300">→</span>
                </div>
              </div>
            </Link>

            {/* Forms Card */}
            <Link to="/forms" className="group">
              <div className="h-full p-6 rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 text-white shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  📝
                </div>
                <h3 className="text-2xl font-bold mb-2">Forms Demo</h3>
                <p className="text-pink-100 mb-4">
                  Controlled & uncontrolled components
                </p>
                <div className="flex items-center text-sm font-semibold">
                  <span>Try Forms</span>
                  <span className="ml-2 group-hover:translate-x-2 transition-transform duration-300">→</span>
                </div>
              </div>
            </Link>

            {/* Dashboard/Login Card */}
            {isAuthenticated ? (
              <Link to="/dashboard" className="group">
                <div className="h-full p-6 rounded-xl bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    📊
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Dashboard</h3>
                  <p className="text-green-100 mb-4">
                    Protected route with user data
                  </p>
                  <div className="flex items-center text-sm font-semibold">
                    <span>View Dashboard</span>
                    <span className="ml-2 group-hover:translate-x-2 transition-transform duration-300">→</span>
                  </div>
                </div>
              </Link>
            ) : (
              <Link to="/login" className="group">
                <div className="h-full p-6 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    🔐
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Login</h3>
                  <p className="text-orange-100 mb-4">
                    Authentication & protected routes
                  </p>
                  <div className="flex items-center text-sm font-semibold">
                    <span>Login Now</span>
                    <span className="ml-2 group-hover:translate-x-2 transition-transform duration-300">→</span>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>

        {/* Topics Covered Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
            📚 Interview Topics Covered
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* State Management */}
            <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-blue-500">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                <span className="text-2xl mr-3">🔄</span>
                State Management
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>useState & useReducer</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>Context API patterns</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>Redux Toolkit integration</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>State persistence</span>
                </li>
              </ul>
            </div>

            {/* React Hooks */}
            <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-purple-500">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                <span className="text-2xl mr-3">🪝</span>
                React Hooks
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">✓</span>
                  <span>All built-in hooks</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">✓</span>
                  <span>Custom hooks creation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">✓</span>
                  <span>Hook rules & best practices</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">✓</span>
                  <span>Performance optimization</span>
                </li>
              </ul>
            </div>

            {/* Routing */}
            <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-pink-500">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                <span className="text-2xl mr-3">🛣️</span>
                Routing
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">✓</span>
                  <span>React Router v6</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">✓</span>
                  <span>Protected routes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">✓</span>
                  <span>Navigation patterns</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">✓</span>
                  <span>Dynamic routing</span>
                </li>
              </ul>
            </div>

            {/* Performance */}
            <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-green-500">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                <span className="text-2xl mr-3">⚡</span>
                Performance
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>React.memo usage</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>useMemo & useCallback</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Code splitting</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Lazy loading</span>
                </li>
              </ul>
            </div>

            {/* Forms */}
            <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-yellow-500">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                <span className="text-2xl mr-3">📋</span>
                Forms
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-yellow-500 mr-2">✓</span>
                  <span>Controlled components</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-500 mr-2">✓</span>
                  <span>Uncontrolled components</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-500 mr-2">✓</span>
                  <span>Form validation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-500 mr-2">✓</span>
                  <span>Debouncing techniques</span>
                </li>
              </ul>
            </div>

            {/* Authentication */}
            <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-red-500">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                <span className="text-2xl mr-3">🔒</span>
                Authentication
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✓</span>
                  <span>Login/Logout flow</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✓</span>
                  <span>Token management</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✓</span>
                  <span>Route protection</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✓</span>
                  <span>Session handling</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
            📈 Learning Stats
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg">
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-blue-100">React Hooks</div>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg">
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-purple-100">Code Examples</div>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 text-white shadow-lg">
              <div className="text-4xl font-bold mb-2">100+</div>
              <div className="text-pink-100">Interview Questions</div>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg">
              <div className="text-4xl font-bold mb-2">10+</div>
              <div className="text-green-100">Topics Covered</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center py-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Built with React 19 + Vite + Tailwind CSS + Redux Toolkit
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Current Theme: <span className="font-semibold text-purple-600 dark:text-purple-400">{theme}</span>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default Home;

/**
 * INTERVIEW PREPARATION NOTES
 * 
 * Key Concepts Demonstrated:
 * 
 * 1. Tailwind CSS Utility Classes
 *    - Responsive design (md:, lg: breakpoints)
 *    - Dark mode (dark: prefix)
 *    - Gradients (bg-gradient-to-br)
 *    - Animations (hover:, transition-)
 * 
 * 2. Component Composition
 *    - Reusable card patterns
 *    - Consistent spacing
 *    - Semantic HTML
 * 
 * 3. Context Consumption
 *    - useTheme custom hook
 *    - useAuth custom hook
 *    - Conditional rendering based on auth state
 * 
 * 4. React Router
 *    - Link component for navigation
 *    - Client-side routing
 *    - No page reloads
 * 
 * 5. Accessibility
 *    - aria-label attributes
 *    - Semantic HTML elements
 *    - Keyboard navigation support
 * 
 * 6. Performance
 *    - CSS transitions instead of JS animations
 *    - Optimized re-renders
 *    - Efficient event handlers
 */

// Made with Bob ✨
