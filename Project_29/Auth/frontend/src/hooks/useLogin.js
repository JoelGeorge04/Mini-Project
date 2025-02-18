import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();

  const login = async (username, password) => {
    if (!handleInputErrors(username, password)) return;

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.trim().toLowerCase(), password }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        throw new Error("Server error, please try again later.");
      }

      if (!res.ok) throw new Error(data?.error || "Login failed");

      localStorage.setItem("user", JSON.stringify(data));
      setAuthUser(data);
      toast.success("Login successful!");
      navigate("/"); // Redirect to home page after login
    } catch (error) {
      toast.error(error.message);
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Google login process
  const googlelogin = async (token) => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/google/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        throw new Error("Server error, please try again later.");
      }

      if (!res.ok) throw new Error(data?.error || "Google login failed");

      localStorage.setItem("user", JSON.stringify(data.user));
      setAuthUser(data.user);
      toast.success("Google login successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
      console.error("Google login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login, googlelogin };
};

export default useLogin;

function handleInputErrors(username, password) {
  if (!username.trim() || !password) {
    toast.error("Please fill in all fields");
    return false;
  }
  return true;
}
