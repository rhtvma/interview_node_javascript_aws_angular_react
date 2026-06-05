import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/layout/Sidebar';
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
 * Demonstrates: React Router, navigation, layout with sidebar
 */
function App() {
  const { theme } = useTheme();

  return (
    <BrowserRouter>
      <div className={`app theme-${theme} min-h-screen`}>
        {/* Sidebar Navigation */}
        <Sidebar />

        {/* Main Content Area */}
        <main className="main-content md:ml-0">
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