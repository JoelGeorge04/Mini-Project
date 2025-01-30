/* eslint-disable no-unused-vars */
{/* ForgotPassword.js */}
import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavbarAuth from '../../components/Navbar/navAuth';
import useForgotPassword from "../../hooks/useForgotPassword";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const { username, setUsername, loading, handleSubmit } = useForgotPassword();
  const [error, setError] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await handleSubmit(); // assuming this function sends the request and handles success/error
      toast.success("Password reset link sent! Check your email.");
    } catch (error) {
      setError(error.message || "Something went wrong. Please try again.");
      toast.error(error.message || "Failed to send reset link.");
    }
  };

  return (
    <>
      <NavbarAuth />
      <div className="flex flex-col items-center justify-center min-w-[484px] mx-auto py-8 px-4 mt-24">
        <div className="w-full max-w-md p-8 rounded-xl shadow-lg bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 border border-gray-600 transition-all duration-300 ease-in-out hover:bg-gray-850 hover:shadow-2xl hover:border-yellow-400">
          <h1 className="text-3xl font-semibold text-center text-gray-300 mb-6">
            Forgot Password
          </h1>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label className="label p-2">
                <span className="text-base label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="Enter your username"
                className="w-full input input-bordered h-10 px-3 rounded-md"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            {error && <p className="text-red-500 text-xs">{error}</p>}

            {/* Submit Button */}
            <div>
              <button
                className="btn btn-block btn-sm mt-4 transition-all duration-300 ease-in-out hover:bg-blue-400 hover:text-blue-800"
                disabled={loading}
              >
                {loading ? <span className="loading loading-spinner"></span> : "Send Reset Link"}
              </button>
            </div>
          </form>

          {/* Back to Login */}
          <div className="mt-4 text-center">
            <Link to="/login" className="text-sm hover:underline hover:text-blue-600">
              Remembered your password? Login here
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
