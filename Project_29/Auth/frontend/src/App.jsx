import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import ForgotPassword from "./pages/login/forgot-password";
import ResetPassword from "./pages/login/reset-password";
import ValidateResetToken from "./hooks/validatePassword";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  const { authUser } = useAuthContext();

  return (
    <GoogleOAuthProvider clientId="your-client-id">
      <div className="p-4 h-screen flex items-center justify-center">
        <Routes>
          <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />} />
          <Route path="/signup" element={authUser ? <Navigate to="/" /> : <SignUp />} />
          <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/reset-password/:token" component={ResetPassword} />
        <Route path="/validate-reset-token/:token" component={ValidateResetToken} />
          </Routes>
        <Toaster />
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
