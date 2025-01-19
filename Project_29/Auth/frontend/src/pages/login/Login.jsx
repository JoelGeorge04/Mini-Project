import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import NavbarAuth from "../../components/Navbar/navAuth";
import ReCAPTCHA from "react-google-recaptcha";
import toast from "react-hot-toast";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [recaptchaValue, setRecaptchaValue] = useState(null); 	// To store the reCAPTCHA response

  const { loading, login } = useLogin();

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

  return (
    <>
      <NavbarAuth />
      <div className="flex flex-col items-center justify-center min-w-[384px] mx-auto py-8 px-4">
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

            <div>
              <button
                className="btn btn-block btn-sm mt-4 transition-all duration-300 ease-in-out hover:bg-blue-400 hover:text-blue-800"
                disabled={loading}
              >
                {loading ? <span className="loading loading-spinner "></span> : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
