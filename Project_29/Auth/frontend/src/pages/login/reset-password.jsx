/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/navbar';
import useResetPassword from '../../hooks/useResetPassword';

const ResetPassword = () => {
  const { token } = useParams(); // Get token from URL
  const { handleResetPassword } = useResetPassword();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      toast.error('Invalid or missing token');
      navigate('/login');
    }
  }, [token, navigate]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await handleResetPassword(token, password); // Pass token and new password to the backend
      toast.success('Password reset successful');
      navigate('/login'); // Redirect to login page
    } catch (error) {
      setError(error.message || 'Something went wrong. Please try again.');
      toast.error(error.message || 'Failed to reset password');
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-w-[484px] mx-auto py-8 px-4 mt-24">
        <div className="w-full max-w-md p-8 rounded-xl shadow-lg bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 border border-gray-600 transition-all duration-300 ease-in-out hover:bg-gray-850 hover:shadow-2xl hover:border-yellow-400">
          <h1 className="text-3xl font-semibold text-center text-gray-300 mb-6">Reset Password</h1>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label className="label p-2">
                <span className="text-base label-text">New Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter new password"
                className="w-full input input-bordered h-10 px-3 rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="label p-2">
                <span className="text-base label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="Confirm new password"
                className="w-full input input-bordered h-10 px-3 rounded-md"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="text-red-500 text-xs">{error}</p>}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="btn btn-block btn-sm mt-4 transition-all duration-300 ease-in-out hover:bg-blue-400 hover:text-blue-800"
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
