import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../services/apiService';  // API call service
import './signup.css'; // Link to the signup CSS file

const SignUp = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form submission for signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Making the POST request to the backend API
      const response = await signUp(formData);

      if (response.message === 'User created successfully') {
        navigate('/login');  // Redirect to login after successful signup
      } else {
        alert('Registration failed!');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('Signup failed. Please try again.');
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
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  );
};

export default SignUp;
