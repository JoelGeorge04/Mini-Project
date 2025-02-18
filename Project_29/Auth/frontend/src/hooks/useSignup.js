import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom"; 

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();

  const signup = async ({ fullName, username, password, confirmPassword }) => {
    if (loading) return; // Prevent duplicate requests

    const success = handleInputErrors({ fullName, username, password, confirmPassword });
    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, username, password, confirmPassword }),
      });

      if (!res.ok) {
        throw new Error(`Signup failed: ${res.status} ${res.statusText}`);
      }

      const data = await res.json().catch(() => {
        throw new Error("Invalid server response");
      });

      if (!data || data.error) {
        throw new Error(data?.error || "Unknown error occurred during signup.");
      }

      localStorage.setItem("user", JSON.stringify(data));
      setAuthUser(data);
      navigate("/");
      toast.success("Signup successful!");
    } catch (error) {
      console.error("Signup Error:", error);
      toast.error(error.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Google login process
  const googleSignup = async (token) => {
    if (loading) return; // Prevent duplicate requests

    setLoading(true);
    try {
      const res = await fetch("/api/auth/google/callback", {
        method: "POST",
        headers: {  
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      if (!res.ok) {
        throw new Error(`Google Auth failed: ${res.status} ${res.statusText}`);
      }

      const text = await res.text();
      if (!text) {
        throw new Error("Empty response from server.");
      }

      const data = JSON.parse(text);
      if (!data.user) {
        throw new Error("User data missing in response.");
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      setAuthUser(data.user);
      navigate("/");
      toast.success("Google login successful!");
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Google login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup, googleSignup };
};

export default useSignup;

// Input validation
function handleInputErrors({ fullName, username, password, confirmPassword }) {
  if (!fullName || !username || !password || !confirmPassword) {
    toast.error("All fields are required.");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match.");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters.");
    return false;
  }

  return true;
}
