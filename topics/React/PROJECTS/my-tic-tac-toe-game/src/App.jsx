import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { useTheme } from './hooks/useTheme';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Game from './pages/Game';
import HooksDemo from './pages/HooksDemo';
import Forms from './pages/Forms';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import './App.css';

/**
 * MAIN APP COMPONENT
 * Interview Topic: Routing & App Structure
 * Demonstrates: React Router, navigation, layout
 */
function App() {
  const { isAuthenticated, logout } = useAuth();
  const { theme } = useTheme();

  return (
    <BrowserRouter>
      <div className={`app theme-${theme}`}>
        {/* Navigation */}
        <nav className="main-nav">
          <div className="nav-brand">
            <Link to="/">React Interview App</Link>
          </div>

          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/game">Game</Link></li>
            <li><Link to="/hooks">Hooks</Link></li>
            <li><Link to="/forms">Forms</Link></li>
            {isAuthenticated ? (
              <>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><button onClick={logout} className="nav-btn">Logout</button></li>
              </>
            ) : (
              <li><Link to="/login">Login</Link></li>
            )}
          </ul>
        </nav>

        {/* Routes */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game" element={<Game />} />
            <Route path="/hooks" element={<HooksDemo />} />
            <Route path="/forms" element={<Forms />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;