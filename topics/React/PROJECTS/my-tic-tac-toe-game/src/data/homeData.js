/**
 * HOME PAGE DATA CONFIGURATION
 * Centralized data for Home page components
 * Makes it easy to modify content without touching component logic
 */

export const FEATURES = [
  {
    to: '/game',
    icon: '🎮',
    title: 'Tic-Tac-Toe',
    description: 'Redux state management with game logic',
    gradient: 'from-blue-500 to-blue-600',
    actionText: 'Play Now',
  },
  {
    to: '/hooks',
    icon: '🪝',
    title: 'React Hooks',
    description: 'All hooks with practical examples',
    gradient: 'from-purple-500 to-purple-600',
    actionText: 'Explore Hooks',
  },
  {
    to: '/forms',
    icon: '📝',
    title: 'Forms Demo',
    description: 'Controlled & uncontrolled components',
    gradient: 'from-pink-500 to-pink-600',
    actionText: 'Try Forms',
  },
];

export const AUTH_FEATURE = {
  authenticated: {
    to: '/dashboard',
    icon: '📊',
    title: 'Dashboard',
    description: 'Protected route with user data',
    gradient: 'from-green-500 to-green-600',
    actionText: 'View Dashboard',
  },
  unauthenticated: {
    to: '/login',
    icon: '🔐',
    title: 'Login',
    description: 'Authentication & protected routes',
    gradient: 'from-orange-500 to-orange-600',
    actionText: 'Login Now',
  },
};

export const TOPICS = [
  {
    icon: '🔄',
    title: 'State Management',
    borderColor: 'border-blue-500',
    checkColor: 'text-blue-500',
    items: [
      'useState & useReducer',
      'Context API patterns',
      'Redux Toolkit integration',
      'State persistence',
    ],
  },
  {
    icon: '🪝',
    title: 'React Hooks',
    borderColor: 'border-purple-500',
    checkColor: 'text-purple-500',
    items: [
      'All built-in hooks',
      'Custom hooks creation',
      'Hook rules & best practices',
      'Performance optimization',
    ],
  },
  {
    icon: '🛣️',
    title: 'Routing',
    borderColor: 'border-pink-500',
    checkColor: 'text-pink-500',
    items: [
      'React Router v6',
      'Protected routes',
      'Navigation patterns',
      'Dynamic routing',
    ],
  },
  {
    icon: '⚡',
    title: 'Performance',
    borderColor: 'border-green-500',
    checkColor: 'text-green-500',
    items: [
      'React.memo usage',
      'useMemo & useCallback',
      'Code splitting',
      'Lazy loading',
    ],
  },
  {
    icon: '📋',
    title: 'Forms',
    borderColor: 'border-yellow-500',
    checkColor: 'text-yellow-500',
    items: [
      'Controlled components',
      'Uncontrolled components',
      'Form validation',
      'Debouncing techniques',
    ],
  },
  {
    icon: '🔒',
    title: 'Authentication',
    borderColor: 'border-red-500',
    checkColor: 'text-red-500',
    items: [
      'Login/Logout flow',
      'Token management',
      'Route protection',
      'Session handling',
    ],
  },
];

export const STATS = [
  {
    value: '15+',
    label: 'React Hooks',
    gradient: 'from-blue-500 to-blue-600',
    labelColor: 'text-blue-100',
  },
  {
    value: '50+',
    label: 'Code Examples',
    gradient: 'from-purple-500 to-purple-600',
    labelColor: 'text-purple-100',
  },
  {
    value: '100+',
    label: 'Interview Questions',
    gradient: 'from-pink-500 to-pink-600',
    labelColor: 'text-pink-100',
  },
  {
    value: '10+',
    label: 'Topics Covered',
    gradient: 'from-green-500 to-green-600',
    labelColor: 'text-green-100',
  },
];

// Made with Bob
