import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/apiService'; // API call service
import './login.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // State for error message
  const [success, setSuccess] = useState(null); // State for success message
  const navigate = useNavigate();

  // Handle form submission for login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Reset error state
    setSuccess(null); // Reset success state

    try {
      // Making the POST request to the backend API
      const response = await login(formData);

      if (response.message === 'User Logged In successfully') {
        // Save the token to localStorage
        localStorage.setItem('authToken', response.data.token);

        // Show success message
        setSuccess('Logged in successfully! Redirecting to the home page...');

        // Navigate to the home page after a short delay
        setTimeout(() => {
          navigate('/home'); // Redirect to HomePage ("/home" route)
        }, 2000);
      } else if (response.message === 'Invalid credentials') {
        setError('Invalid email or password. Please try again.');
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An unexpected error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        {/* Display error message */}
        {error && <p className="error-message">{error}</p>}

        {/* Display success message */}
        {success && <p className="success-message">{success}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Logging In...' : 'Login'}
        </button>
      </form>
      <p>
        Don’t have an account? <a href="/signup">Sign Up</a>
      </p>


    </div>
  );
};

export default Login;
