import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import NavbarAuth from "../../components/Navbar/navAuth";
import ReCAPTCHA from "react-google-recaptcha";
import toast from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [recaptchaValue, setRecaptchaValue] = useState(null); // To store the reCAPTCHA response
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState(""); // Email for password reset
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false); // Toggle modal visibility

  const { loading, login, googlelogin, forgotPassword } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if reCAPTCHA is validated
    if (!recaptchaValue) {
      toast("Please complete the reCAPTCHA verification.");
      return;
    }

    // Proceed with the login
    await login(username, password);
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    if (!forgotPasswordEmail) {
      toast("Please enter your email.");
      return;
    }

    // Call the forgot password logic from useLogin
    await forgotPassword(forgotPasswordEmail);
    setShowForgotPasswordModal(false); // Close the modal after submission
  };

  // Google sign-in success handler
  const handleGoogleSuccess = (response) => {
    const { credential } = response; // The token received from Google
    googlelogin(credential);
  };

  const handleGoogleFailure = (error) => {
    console.error("Google Login Error:", error);
    toast.error("Google Sign-In failed. Please try again.");
  };

  return (
    <>
      <NavbarAuth />
      <div className="flex flex-col items-center justify-center min-w-[484px] mx-auto py-8 px-4 mt-24">
        <div className="w-full max-w-md p-8 rounded-xl shadow-lg bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 border border-gray-600 transition-all duration-300 ease-in-out hover:bg-gray-850 hover:shadow-2xl hover:border-yellow-400">
          <h1 className="text-3xl font-semibold text-center text-gray-300 mb-6">
            Login to{" "}
            <span className="text-blue-500 hover:text-red-400 transition-all duration-300 ease-in-out">
              BookMyResource
            </span>
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="label p-2">
                <span className="text-base label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="Enter username"
                className="w-full input input-bordered h-10 px-3 rounded-md"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="label p-2">
                <span className="text-base label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                className="w-full input input-bordered h-10 px-3 rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Add reCAPTCHA widget */}
            <div className="mb-4 p-2">
              <ReCAPTCHA
                sitekey="6Lepx7kqAAAAAGQT-nFBQf6UadrXizjZYCIlcL-o"
                onChange={(value) => setRecaptchaValue(value)}
              />
            </div>

            <div className="mb-4">
              <Link to="/signup" className="text-sm hover:underline hover:text-blue-600">
                {"Don't"} have an account?
              </Link>
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                className="btn btn-block btn-sm mt-4 transition-all duration-300 ease-in-out hover:bg-blue-400 hover:text-blue-800"
                disabled={loading}
              >
                {loading ? <span className="loading loading-spinner"></span> : "Login"}
              </button>
            </div>
          </form>

          {/* Google Sign-In Button */}
          <div className="mt-4">
            <p className="text-center mb-4">Or sign up with Google</p>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleFailure}
              useOneTap
            />
          </div>

          {/* Forgot Password Link (now below Google Sign-In) */}
          <div className="mt-4 text-center">
            <Link to="/forgot-password" className="text-sm hover:underline hover:text-blue-600">
              Forgot Password?
            </Link>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPasswordModal && (
        <div className="forgot-password-modal">
          <div className="modal-content">
            <h3>Forgot Password</h3>
            <form onSubmit={handleForgotPasswordSubmit}>
              <div>
                <label>Email</label>
                <input
                  type="email"
                  value={forgotPasswordEmail}
                  onChange={(e) => setForgotPasswordEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mt-4">
                <button type="submit" className="btn">
                  Send Reset Link
                </button>
              </div>
            </form>
            <button
              onClick={() => setShowForgotPasswordModal(false)}
              className="btn mt-2"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
