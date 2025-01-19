import { Link } from "react-router-dom";
import { useState } from "react";
import NavbarAuth from "../../components/Navbar/navAuth";
import useSignup from "../../hooks/useSignup";
import ReCAPTCHA from "react-google-recaptcha";
import toast from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google"; // Import GoogleLogin component

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [recaptchaValue, setRecaptchaValue] = useState(null);

  const { loading, signup, googleSignup } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure reCAPTCHA is verified before submission
    if (!recaptchaValue) {
      toast("Please complete the reCAPTCHA verification.");
      return;
    }

    await signup(inputs);
  };

  // Google sign-in success handler
  const handleGoogleSuccess = (response) => {
    const { credential } = response;  // The token received from Google
    googleSignup(credential);      
  };

  const handleGoogleFailure = (error) => {
    console.error("Google Login Error:", error);
    toast.error("Google Sign-In failed. Please try again.");
  };

  return (
    <>
      <NavbarAuth />
      <div className="flex flex-col items-center justify-center min-w-[484px] mx-auto py-8 px-4 mt-24">
        <div className="w-full max-w-md p-8 rounded-xl shadow-lg bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 border border-gray-600 transition-all duration-300 ease-in-out hover:bg-gray-850 hover:shadow-2xl hover:border-yellow-400" style={{ marginTop: "240px", width: "700px" }}>
          <h1 className="text-3xl font-semibold text-center text-gray-300 mb-6">
            Sign Up for{" "}
            <span className="text-blue-500 hover:text-red-400 transition-all duration-300 ease-in-out">
              BookMyResource
            </span>
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="label p-2">
                <span className="text-base label-text">Full Name</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                className="w-full input input-bordered h-10 px-3 rounded-md"
                value={inputs.fullName}
                onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
              />
            </div>

            <div className="mb-4">
              <label className="label p-2">
                <span className="text-base label-text">Email-Address</span>
              </label>
              <input
                type="text"
                placeholder="Email-Address"
                className="w-full input input-bordered h-10 px-3 rounded-md"
                value={inputs.username}
                onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
              />
            </div>

            <div className="mb-4">
              <label className="label p-2">
                <span className="text-base label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                className="w-full input input-bordered h-10 px-3 rounded-md"
                value={inputs.password}
                onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
              />
            </div>

            <div className="mb-4">
              <label className="label p-2">
                <span className="text-base label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full input input-bordered h-10 px-3 rounded-md"
                value={inputs.confirmPassword}
                onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
              />
            </div>

            {/* Add reCAPTCHA widget */}
            <div className="mb-4 p-2">
              <ReCAPTCHA
                sitekey="6Lepx7kqAAAAAGQT-nFBQf6UadrXizjZYCIlcL-o"    // Replace with your actual site key
                onChange={(value) => setRecaptchaValue(value)}
              />
            </div>

            <div className="mb-4">
              <Link to="/login" className="text-sm hover:underline hover:text-blue-600">
                Already have an account?
              </Link>
            </div>

            {/* Sign-up button */}
            <div>
              <button
                className="btn btn-block btn-sm mt-4 transition-all duration-300 ease-in-out hover:bg-blue-400 hover:text-blue-800"
                disabled={loading}
              >
                {loading ? <span className="loading loading-spinner"></span> : "Sign Up"}
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
        </div>
      </div>
    </>
  );
};

export default SignUp;
