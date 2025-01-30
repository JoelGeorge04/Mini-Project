import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import ForgotPassword from "./pages/login/forgot-password";
import ResetPassword from "./pages/login/reset-password";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  const { authUser } = useAuthContext();

  return (
    <GoogleOAuthProvider clientId="773780830761-r7iudrudoc4mhdcf800605k9unr27nis.apps.googleusercontent.com">
      <div className="p-4 h-screen flex items-center justify-center">
        <Routes>
          <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />} />
          <Route path="/signup" element={authUser ? <Navigate to="/" /> : <SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          </Routes>
        <Toaster />
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
