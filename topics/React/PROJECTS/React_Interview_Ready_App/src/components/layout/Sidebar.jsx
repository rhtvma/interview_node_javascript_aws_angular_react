import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';

/**
 * SIDEBAR NAVIGATION COMPONENT
 * 
 * Interview Topics Covered:
 * - Component composition
 * - Conditional rendering
 * - State management (collapse/expand)
 * - Responsive design (mobile drawer)
 * - Active route highlighting
 * - Icon integration
 * - Accessibility (ARIA labels)
 * 
 * Features:
 * - Collapsible sidebar
 * - Mobile-responsive drawer
 * - Active route highlighting
 * - Theme-aware styling
 * - Smooth animations
 */

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const location = useLocation();
    const { isAuthenticated, user } = useAuth();
    const { theme, toggleTheme } = useTheme();

    // Navigation items configuration
    const navItems = [
        {
            path: '/',
            label: 'Home',
            icon: '🏠',
            public: true
        },
        {
            path: '/game',
            label: 'Game',
            icon: '🎮',
            public: true
        },
        {
            path: '/hooks',
            label: 'Hooks Demo',
            icon: '🔧',
            public: true
        },
        {
            path: '/forms',
            label: 'Forms',
            icon: '📝',
            public: true
        },
        {
            path: '/dashboard',
            label: 'Dashboard',
            icon: '📊',
            protected: true
        }
    ];

    // Filter items based on authentication
    const visibleItems = navItems.filter(item =>
        item.public || (item.protected && isAuthenticated)
    );

    // Check if route is active
    const isActive = (path) => location.pathname === path;

    // Toggle sidebar collapse
    const toggleCollapse = () => setIsCollapsed(!isCollapsed);

    // Toggle mobile drawer
    const toggleMobile = () => setIsMobileOpen(!isMobileOpen);

    // Close mobile drawer on navigation
    const handleNavClick = () => {
        if (window.innerWidth < 768) {
            setIsMobileOpen(false);
        }
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={toggleMobile}
                className="fixed top-4 left-4 z-50 md:hidden p-3 bg-primary-500 text-white rounded-lg shadow-lg hover:bg-primary-600 transition-all duration-300"
                aria-label="Toggle menu"
            >
                <span className="text-2xl">{isMobileOpen ? '✕' : '☰'}</span>
            </button>

            {/* Mobile Overlay */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
                    onClick={toggleMobile}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
          fixed top-0 left-0 h-full bg-white dark:bg-gray-800 shadow-2xl z-40
          transition-all duration-300 ease-in-out
          ${isCollapsed ? 'w-20' : 'w-64'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
                aria-label="Main navigation"
            >
                {/* Sidebar Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                    {!isCollapsed && (
                        <Link
                            to="/"
                            className="text-xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent"
                            onClick={handleNavClick}
                        >
                            React App
                        </Link>
                    )}
                    <button
                        onClick={toggleCollapse}
                        className="hidden md:block p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                    >
                        <span className="text-xl">{isCollapsed ? '→' : '←'}</span>
                    </button>
                </div>

                {/* User Profile Section */}
                {isAuthenticated && (
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                                {(user?.name || user?.email)?.[0]?.toUpperCase()}
                            </div>
                            {!isCollapsed && (
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">
                                        {user?.name || 'User'}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                        {user?.email}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Navigation Links */}
                <nav className="flex-1 overflow-y-auto p-4">
                    <ul className="space-y-2">
                        {visibleItems.map((item) => (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    onClick={handleNavClick}
                                    className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg
                    transition-all duration-200
                    ${isActive(item.path)
                                            ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                        }
                    ${isCollapsed ? 'justify-center' : ''}
                  `}
                                    title={isCollapsed ? item.label : ''}
                                >
                                    <span className="text-2xl flex-shrink-0">{item.icon}</span>
                                    {!isCollapsed && (
                                        <span className="font-medium">{item.label}</span>
                                    )}
                                    {!isCollapsed && isActive(item.path) && (
                                        <span className="ml-auto">✓</span>
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Sidebar Footer */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className={`
              w-full flex items-center gap-3 px-4 py-3 rounded-lg
              text-gray-700 dark:text-gray-300
              hover:bg-gray-100 dark:hover:bg-gray-700
              transition-all duration-200
              ${isCollapsed ? 'justify-center' : ''}
            `}
                        title={isCollapsed ? 'Toggle theme' : ''}
                    >
                        <span className="text-2xl">{theme === 'dark' ? '☀️' : '🌙'}</span>
                        {!isCollapsed && (
                            <span className="font-medium">
                                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                            </span>
                        )}
                    </button>

                    {/* Login/Logout */}
                    {!isCollapsed && (
                        <Link
                            to={isAuthenticated ? '/dashboard' : '/login'}
                            onClick={handleNavClick}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
                        >
                            <span className="text-2xl">{isAuthenticated ? '🚪' : '🔐'}</span>
                            <span className="font-medium">
                                {isAuthenticated ? 'Logout' : 'Login'}
                            </span>
                        </Link>
                    )}
                </div>
            </aside>

            {/* Main Content Spacer */}
            <div
                className={`
          hidden md:block transition-all duration-300
          ${isCollapsed ? 'w-20' : 'w-64'}
        `}
                aria-hidden="true"
            />
        </>
    );
};

export default Sidebar;

/**
 * INTERVIEW NOTES:
 *
 * 1. State Management:
 *    - Local state for UI (collapse, mobile drawer)
 *    - Context for global state (auth, theme)
 *
 * 2. Responsive Design:
 *    - Mobile: Full-screen drawer with overlay
 *    - Desktop: Fixed sidebar with collapse
 *    - Smooth transitions between states
 *
 * 3. Accessibility:
 *    - ARIA labels for screen readers
 *    - Keyboard navigation support
 *    - Focus management
 *
 * 4. Performance:
 *    - Conditional rendering
 *    - CSS transitions (GPU accelerated)
 *    - Event delegation
 *
 * 5. Best Practices:
 *    - Component composition
 *    - Separation of concerns
 *    - Reusable configuration
 *    - Clean code structure
 */

// Made with Bob
