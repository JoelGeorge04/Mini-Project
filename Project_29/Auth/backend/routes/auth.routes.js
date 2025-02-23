import express from "express";
import { login, logout, signup, forgotPassword, resetPassword, resetPasswordPage } from "../controllers/auth.controller.js";
import { handleGoogleOAuth } from "../controllers/auth.controller.js";

const router = express.Router();

// User signup route
router.post("/signup", signup);

// User login route
router.post("/login", login);

// User logout route
router.post("/logout", logout);

// Password reset routes
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.get('/reset-password/:token', resetPasswordPage);

router.post("/google/callback", async (req, res) => {
  const { token } = req.body;

  try {
    const { user, jwtToken } = await handleGoogleOAuth(token);

    return res.json({ message: "Google authentication successful", user, jwtToken });

  } catch (error) {
    console.error("Error during Google OAuth callback:", error.message);

    if (!res.headersSent) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
});


export default router;
  