import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import InterviewQuestionSet from '../components/interview/InterviewQuestionSet';
import { pageInterviewQuestions } from '../data/interviewBank';

const stats = [
  { label: 'Profile Complete', value: '85%', accent: 'bg-blue-600', width: '85%' },
  { label: 'Games Played', value: '12', accent: 'bg-green-600', width: '62%' },
  { label: 'Learning Progress', value: '67%', accent: 'bg-indigo-600', width: '67%' },
  { label: 'Achievements', value: '8', accent: 'bg-amber-500', width: '48%' },
];

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const displayName = user?.name || user?.email?.split('@')[0] || 'User';

  return (
    <div className="page-shell">
      <header className="page-header">
        <p className="page-eyebrow">Protected Dashboard</p>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="page-title">Welcome, {displayName}</h1>
            <p className="page-subtitle">
              Your authenticated workspace for reviewing progress and jumping back into demos.
            </p>
          </div>
          <button onClick={handleLogout} className="btn btn-secondary">
            Logout
          </button>
        </div>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <h2 className="card-title text-lg mb-4">Profile</h2>
            <div className="flex flex-col sm:flex-row gap-5 sm:items-center">
              <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold">
                {(user?.name || user?.email)?.[0]?.toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-xl font-bold text-gray-900 dark:text-white">{displayName}</p>
                <p className="text-gray-600 dark:text-gray-400 break-all">{user?.email}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Role: {user?.role || 'Member'}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div className="card" key={stat.label}>
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <p className="card-title">{stat.label}</p>
                    <p className="card-muted">Updated this week</p>
                  </div>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</span>
                </div>
                <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                  <div className={`h-full rounded-full ${stat.accent}`} style={{ width: stat.width }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="space-y-6">
          <div className="card">
            <h2 className="card-title text-lg mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 gap-3">
              {[
                ['Play Game', '/game'],
                ['Hooks Demo', '/hooks'],
                ['Forms Demo', '/forms'],
                ['Home', '/'],
              ].map(([label, path]) => (
                <button
                  key={label}
                  onClick={() => navigate(path)}
                  className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <span className="font-semibold">{label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="card">
            <h2 className="card-title text-lg mb-4">Route Notes</h2>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <li>Requires authentication before access.</li>
              <li>Redirects unauthenticated users to login.</li>
              <li>Uses AuthContext for session state.</li>
              <li>Provides a clean logout flow.</li>
            </ul>
          </div>
        </aside>
      </section>

      <InterviewQuestionSet {...pageInterviewQuestions.dashboard} />
    </div>
  );
}

export default Dashboard;
