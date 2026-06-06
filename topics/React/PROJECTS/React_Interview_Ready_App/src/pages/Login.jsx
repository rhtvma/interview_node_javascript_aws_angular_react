/**
 * LOGIN PAGE - Interview Topic: Authentication Flow
 *
 * Purpose: Simple login flow for route protection and demo auth state.
 * Interview Points:
 * - Form handling and async login
 * - Redirect after login
 * - Protected route user flow
 *
 * Interview Questions to Prepare:
 * Q1: What is the typical client-side auth flow?
 * A: Collect credentials, validate, store session state, and protect routes/components.
 *
 * Q2: Why use location.state.from for redirects?
 * A: To return users to their intended destination after authentication.
 *
 * Q3: What should you do after a failed login attempt?
 * A: Clear loading state, show a user-friendly error, and avoid side effects.
 */
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import InterviewQuestionSet from '../components/interview/InterviewQuestionSet';
import { pageInterviewQuestions } from '../data/interviewBank';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const from = location.state?.from || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(formData.email, formData.password);

    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.error || 'Login failed');
    }

    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="login-page">
      <div className="login-layout">
        <div className="login-container">
        <p className="page-eyebrow">Authentication</p>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" disabled={loading} className="btn btn-primary">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="demo-note">
          Demo: use any email and password to login.
        </p>
        </div>

        <InterviewQuestionSet {...pageInterviewQuestions.login} />
      </div>
    </div>
  );
}

export default Login;
