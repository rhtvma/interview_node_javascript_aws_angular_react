import { memo } from 'react';
import PropTypes from 'prop-types';

/**
 * WELCOME CARD COMPONENT
 * Displays personalized welcome message based on authentication status
 * 
 * Interview Topics: Conditional Rendering, Props, React.memo
 */

const WelcomeCard = memo(({ isAuthenticated, user }) => {
  return (
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
  );
});

WelcomeCard.displayName = 'WelcomeCard';

WelcomeCard.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
};

export default WelcomeCard;

// Made with ❤️ for Interview Preparation
