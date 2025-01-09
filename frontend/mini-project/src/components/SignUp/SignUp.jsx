import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../services/apiService'; 
import './signup.css'; 

const SignUp = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); 
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();


  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); 
    setSuccess(null); 
  
    // Frontend validation for password length
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long.');
      setLoading(false);
      return;
    }

    try {
      const response = await signUp(formData);
  
      if (response.message === 'User already exists') {
        setError('Error: User with this email already exists.');
      } else if (response.message === 'User created successfully') {
        setSuccess('Signup successful! Please check your email for verification.');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setError('Error: Registration failed. Please try again.');
      }
    } catch (error) {
      // Logging the actual error to understand the underlying issue
      console.error('Error during sign up:', error);
      
      // Check if the error contains a message and display it
      if (error instanceof Error) {
        setError(`Error: ${error.message || 'An unexpected error occurred. Please try again later.'}`);
      } else {
        setError('Error: An unexpected error occurred. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
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
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>} {/* Display error messages */}
      {success && <p className="success-message">{success}</p>} {/* Display success messages */}
      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
};

export default SignUp; 