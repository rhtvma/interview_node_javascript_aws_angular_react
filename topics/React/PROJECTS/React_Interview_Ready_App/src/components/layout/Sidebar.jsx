/**
 * SIDEBAR COMPONENT - Interview Topic: Navigation & UI Patterns
 *
 * Purpose: Displays navigation links and theme/auth controls for the app.
 * Interview Points:
 * - Responsive sidebar behavior
 * - Conditional navigation based on auth state
 * - Theme toggle and mobile menu handling
 * - Separation of concerns in layout components
 *
 * Interview Questions to Prepare:
 * Q1: How do you conditionally render menu items for authenticated users?
 * A: Filter navigation items by auth state and render only allowed links.
 *
 * Q2: Why keep sidebar state local in the component?
 * A: Local UI state (collapsed/open) is specific to layout and should not pollute global state.
 *
 * Q3: What is a good pattern for mobile navigation in React?
 * A: Use a local open/close state, overlay backdrop, and responsive CSS classes.
 */
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';

const navItems = [
    { path: '/', label: 'Home', icon: 'H', public: true },
    { path: '/game', label: 'Game', icon: 'G', public: true },
    { path: '/hooks', label: 'Hooks Demo', icon: 'K', public: true },
    { path: '/forms', label: 'Forms', icon: 'F', public: true },
    { path: '/interview-ready', label: 'Interview Ready', icon: 'R', public: true },
    { path: '/practice', label: 'Practice', icon: 'P', public: true },
    { path: '/dashboard', label: 'Dashboard', icon: 'D', protected: true },
];

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const location = useLocation();
    const { isAuthenticated, user } = useAuth();
    const { theme, toggleTheme } = useTheme();

    const visibleItems = navItems.filter(item =>
        item.public || (item.protected && isAuthenticated)
    );

    const isActive = (path) => location.pathname === path;
    const toggleCollapse = () => setIsCollapsed(!isCollapsed);
    const toggleMobile = () => setIsMobileOpen(!isMobileOpen);

    const handleNavClick = () => {
        if (window.innerWidth < 768) {
            setIsMobileOpen(false);
        }
    };

    return (
        <>
            <button
                onClick={toggleMobile}
                className="fixed top-4 left-4 z-50 md:hidden min-h-11 px-4 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
                aria-label="Toggle menu"
            >
                <span className="text-sm font-semibold">{isMobileOpen ? 'Close' : 'Menu'}</span>
            </button>

            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-sm"
                    onClick={toggleMobile}
                    aria-hidden="true"
                />
            )}

            <aside
                className={`
                    fixed top-0 left-0 h-full bg-white/95 dark:bg-gray-900/95 backdrop-blur
                    border-r border-gray-200 dark:border-gray-800 z-40
                    transition-all duration-300 ease-in-out
                    ${isCollapsed ? 'w-20' : 'w-64'}
                    ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                `}
                aria-label="Main navigation"
            >
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
                    {!isCollapsed && (
                        <Link
                            to="/"
                            className="text-lg font-bold text-gray-950 dark:text-white"
                            onClick={handleNavClick}
                        >
                            React Ready
                        </Link>
                    )}
                    <button
                        onClick={toggleCollapse}
                        className="hidden md:block px-3 py-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 transition-colors"
                        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                    >
                        <span className="text-sm font-bold">{isCollapsed ? '>' : '<'}</span>
                    </button>
                </div>

                {isAuthenticated && (
                    <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                                {(user?.name || user?.email)?.[0]?.toUpperCase()}
                            </div>
                            {!isCollapsed && (
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
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

                <nav className="flex-1 overflow-y-auto p-4">
                    <ul className="space-y-2">
                        {visibleItems.map((item) => {
                            const active = isActive(item.path);

                            return (
                                <li key={item.path}>
                                    <Link
                                        to={item.path}
                                        onClick={handleNavClick}
                                        className={`
                                            flex items-center gap-3 px-4 py-3 rounded-lg
                                            transition-colors duration-200
                                            ${active
                                                ? 'bg-blue-600 text-white shadow-sm'
                                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                            }
                                            ${isCollapsed ? 'justify-center' : ''}
                                        `}
                                        title={isCollapsed ? item.label : ''}
                                    >
                                        <span className={`
                                            w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold flex-shrink-0
                                            ${active
                                                ? 'bg-white/20 text-white'
                                                : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300'
                                            }
                                        `}>
                                            {item.icon}
                                        </span>
                                        {!isCollapsed && (
                                            <span className="font-medium">{item.label}</span>
                                        )}
                                        {!isCollapsed && active && (
                                            <span className="ml-auto text-xs font-semibold">Active</span>
                                        )}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <div className="p-4 border-t border-gray-200 dark:border-gray-800 space-y-2">
                    <button
                        onClick={toggleTheme}
                        className={`
                            w-full flex items-center gap-3 px-4 py-3 rounded-lg
                            text-gray-700 dark:text-gray-300
                            hover:bg-gray-100 dark:hover:bg-gray-800
                            transition-colors duration-200
                            ${isCollapsed ? 'justify-center' : ''}
                        `}
                        title={isCollapsed ? 'Toggle theme' : ''}
                    >
                        <span className="w-7 h-7 rounded-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xs font-bold">
                            {theme === 'dark' ? 'L' : 'D'}
                        </span>
                        {!isCollapsed && (
                            <span className="font-medium">
                                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                            </span>
                        )}
                    </button>

                    {!isCollapsed && (
                        <Link
                            to={isAuthenticated ? '/dashboard' : '/login'}
                            onClick={handleNavClick}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                        >
                            <span className="w-7 h-7 rounded-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xs font-bold">
                                {isAuthenticated ? 'O' : 'I'}
                            </span>
                            <span className="font-medium">
                                {isAuthenticated ? 'Dashboard' : 'Login'}
                            </span>
                        </Link>
                    )}
                </div>
            </aside>

            <div
                className={`
                    hidden md:block flex-shrink-0 transition-all duration-300
                    ${isCollapsed ? 'w-20' : 'w-64'}
                `}
                aria-hidden="true"
            />
        </>
    );
};

export default Sidebar;
