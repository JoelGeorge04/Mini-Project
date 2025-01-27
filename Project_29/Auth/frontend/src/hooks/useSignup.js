import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom"; 

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();

  const signup = async ({ fullName, username, password, confirmPassword }) => {
    const success = handleInputErrors({ fullName, username, password, confirmPassword });
    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, username, password, confirmPassword }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem("user", JSON.stringify(data));
      setAuthUser(data);
      navigate("/"); // Navigate to home or any other page
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Google login process
  const googleSignup = async (token) => {
    try {
      const res = await fetch("/api/auth/google/callback", {
        method: "POST",
        headers: {  
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });
  
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem("user", JSON.stringify(data.user));
      setAuthUser(data.user);
      navigate("/"); 
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  return { loading, signup, googleSignup };
};

export default useSignup;

// Input validation
function handleInputErrors({ fullName, username, password, confirmPassword }) {
  if (!fullName || !username || !password || !confirmPassword) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
}
