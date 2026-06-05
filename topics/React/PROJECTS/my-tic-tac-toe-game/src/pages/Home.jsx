import { useCallback } from 'react';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';
import FeatureCard from '../components/home/FeatureCard';
import TopicCard from '../components/home/TopicCard';
import StatCard from '../components/home/StatCard';
import WelcomeCard from '../components/home/WelcomeCard';
import { FEATURES, AUTH_FEATURE, TOPICS, STATS } from '../data/homeData';

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
 * - Data-driven components
 * - Performance optimizations
 */

function Home() {
  const { theme, toggleTheme, isDark } = useTheme();
  const { user, isAuthenticated } = useAuth();

  // Memoize theme toggle handler to prevent unnecessary re-renders
  const handleToggleTheme = useCallback(() => {
    toggleTheme();
  }, [toggleTheme]);

  // Get the appropriate auth feature based on authentication status
  const authFeature = isAuthenticated ? AUTH_FEATURE.authenticated : AUTH_FEATURE.unauthenticated;

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
            onClick={handleToggleTheme}
            className="p-4 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
            aria-label="Toggle theme"
          >
            <span className="text-2xl">
              {isDark ? '☀️' : '🌙'}
            </span>
          </button>
        </div>

        {/* Welcome Card */}
        <WelcomeCard isAuthenticated={isAuthenticated} user={user} />

        {/* Feature Cards Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
            🎯 Explore Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feature) => (
              <FeatureCard key={feature.to} {...feature} />
            ))}
            <FeatureCard {...authFeature} />
          </div>
        </div>

        {/* Topics Covered Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
            📚 Interview Topics Covered
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOPICS.map((topic) => (
              <TopicCard key={topic.title} {...topic} />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
            📈 Learning Stats
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {STATS.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
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

// Made with ❤️ for Interview Preparation ✨
