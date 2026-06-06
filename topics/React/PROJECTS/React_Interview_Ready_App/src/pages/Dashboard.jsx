/**
 * DASHBOARD PAGE - Interview Topic: Protected Routes and State
 *
 * Purpose: Authenticated dashboard showing user progress and links to examples.
 * Interview Points:
 * - Protected route behavior
 * - AuthContext usage and redirect handling
 * - UI state and user session handling
 *
 * Interview Questions to Prepare:
 * Q1: What is a protected route in React Router?
 * A: A route that checks auth state before rendering and redirects unauthorized users.
 *
 * Q2: Why separate auth state from UI state?
 * A: To keep security logic isolated and make components easier to test.
 *
 * Q3: What is the difference between client-side and server-side auth checks?
 * A: Client-side checks guard UI access, while server-side checks protect real data.
 */
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

/**
 * DASHBOARD PAGE - Interview Topic: Protected Routes
 * Demonstrates: Authentication state, protected content, logout
 */
function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto animate-fadeIn">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-6 md:p-8 mb-6 shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Welcome, <span className="text-yellow-300">{user?.name || user?.email?.split('@')[0]}!</span>
            </h1>
            <p className="text-white/90">Your personal dashboard</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-lg border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <span className="text-xl">🚪</span> Logout
          </button>
        </div>
      </div>

      {/* Main Dashboard Tiles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {/* Profile Tile */}
        <div className="col-span-1 sm:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
          <div className="border-b-2 border-gray-100 dark:border-gray-700 pb-3 mb-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">👤 Profile</h3>
          </div>
          <div className="flex flex-col gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-2xl text-white font-bold shadow-lg">
              {(user?.name || user?.email)?.[0]?.toUpperCase()}
            </div>
            <div className="space-y-2">
              <p className="text-xl font-bold text-gray-800 dark:text-white">{user?.name || 'User'}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{user?.email}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Role: {user?.role || 'Member'}</p>
            </div>
          </div>
        </div>

        {/* Statistics Tiles */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-l-4 border-primary-500">
          <div className="border-b-2 border-gray-100 dark:border-gray-700 pb-3 mb-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">📊 Profile</h3>
          </div>
          <div className="flex flex-col items-center py-4">
            <span className="text-4xl font-bold text-gray-800 dark:text-white">85%</span>
            <span className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wide mt-2">Complete</span>
          </div>
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mt-3">
            <div className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transition-all duration-500" style={{ width: '85%' }}></div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-l-4 border-green-500">
          <div className="border-b-2 border-gray-100 dark:border-gray-700 pb-3 mb-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">🎮 Games</h3>
          </div>
          <div className="flex flex-col items-center py-4">
            <span className="text-4xl font-bold text-gray-800 dark:text-white">12</span>
            <span className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wide mt-2">Played</span>
          </div>
          <p className="text-center text-sm text-green-600 dark:text-green-400 mt-3">+3 this week</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-l-4 border-blue-500">
          <div className="border-b-2 border-gray-100 dark:border-gray-700 pb-3 mb-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">📚 Learning</h3>
          </div>
          <div className="flex flex-col items-center py-4">
            <span className="text-4xl font-bold text-gray-800 dark:text-white">67%</span>
            <span className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wide mt-2">Progress</span>
          </div>
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mt-3">
            <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500" style={{ width: '67%' }}></div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-l-4 border-yellow-500">
          <div className="border-b-2 border-gray-100 dark:border-gray-700 pb-3 mb-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">🏆 Achievements</h3>
          </div>
          <div className="flex flex-col items-center py-4">
            <span className="text-4xl font-bold text-gray-800 dark:text-white">8</span>
            <span className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wide mt-2">Unlocked</span>
          </div>
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-3">2 more to go</p>
        </div>

        {/* Quick Action Tiles */}
        <div
          onClick={() => navigate('/game')}
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-2 border-transparent hover:border-primary-500 flex flex-col items-center justify-center gap-4"
        >
          <div className="text-5xl">🎯</div>
          <div className="text-lg font-semibold text-gray-800 dark:text-white text-center">Play Game</div>
        </div>

        <div
          onClick={() => navigate('/hooks')}
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-2 border-transparent hover:border-primary-500 flex flex-col items-center justify-center gap-4"
        >
          <div className="text-5xl">🔧</div>
          <div className="text-lg font-semibold text-gray-800 dark:text-white text-center">Hooks Demo</div>
        </div>

        <div
          onClick={() => navigate('/forms')}
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-2 border-transparent hover:border-primary-500 flex flex-col items-center justify-center gap-4"
        >
          <div className="text-5xl">📝</div>
          <div className="text-lg font-semibold text-gray-800 dark:text-white text-center">Forms</div>
        </div>

        <div
          onClick={() => navigate('/')}
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-2 border-transparent hover:border-primary-500 flex flex-col items-center justify-center gap-4"
        >
          <div className="text-5xl">🏠</div>
          <div className="text-lg font-semibold text-gray-800 dark:text-white text-center">Home</div>
        </div>

        {/* Info Tile */}
        <div className="col-span-1 sm:col-span-2 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 shadow-lg border-l-4 border-primary-500">
          <div className="border-b-2 border-primary-200 dark:border-gray-600 pb-3 mb-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">🎯 Protected Route</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg text-gray-800 dark:text-white text-sm">
              <span className="text-green-500 font-bold text-lg">✓</span>
              <span>Requires authentication</span>
            </li>
            <li className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg text-gray-800 dark:text-white text-sm">
              <span className="text-green-500 font-bold text-lg">✓</span>
              <span>Redirects to login</span>
            </li>
            <li className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg text-gray-800 dark:text-white text-sm">
              <span className="text-green-500 font-bold text-lg">✓</span>
              <span>Uses AuthContext</span>
            </li>
            <li className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg text-gray-800 dark:text-white text-sm">
              <span className="text-green-500 font-bold text-lg">✓</span>
              <span>Secure access</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

// Made with ❤️ for Interview Preparation
