import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/apiService'; // API call service
import './login.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // State for popup
  const navigate = useNavigate();

  // Handle form submission for login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Making the POST request to the backend API
      const response = await login(formData);

      if (response.message === 'User Logged In successfully') {
        // Save the token to localStorage
        localStorage.setItem('token', response.data.token);

        // Show success popup
        setShowSuccessPopup(true);

        // Navigate to the dashboard after a short delay
        setTimeout(() => {
          setShowSuccessPopup(false);
          navigate('/dashboard');
        }, 2000);
      } else {
        alert('Login failed!');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
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
        <button type="submit" disabled={loading}>
          {loading ? 'Logging In...' : 'Login'}
        </button>
      </form>
      <p>
        Don’t have an account? <a href="/signup">Sign Up</a>
      </p>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="popup">
          <p>Logged in successfully!</p>
        </div>
      )}
    </div>
  );
};

export default Login;
