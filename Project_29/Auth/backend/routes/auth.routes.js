import express from "express";
import passport from "passport";
import User from "../models/user.model.js";
import { login, logout, signup } from "../controllers/auth.controller.js";
import { oauth2Client } from "../utils/googleOAuth.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

const router = express.Router();

// User signup route
router.post("/signup", signup);

// User login route
router.post("/login", login);

// User logout route
router.post("/logout", logout);

// Google OAuth login route
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google OAuth callback route (where the client sends the token)
router.post("/google/callback", async (req, res) => {
  const { token } = req.body;

  try {
    // Verify the token with Google
    const ticket = await oauth2Client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    // Check if the user already exists based on Google ID or email (username)
    let user = await User.findOne({ $or: [{ googleId: payload.sub }, { username: payload.email }] });

    if (!user) {
      user = new User({
        googleId: payload.sub,
        fullName: payload.name,
        username: payload.email,
        profilePic: payload.picture,
      });

      await user.save();
    }

    const jwtToken = generateTokenAndSetCookie(user._id, res);
    res.json({ user, jwtToken });

  } catch (error) {
    console.error("Error during Google OAuth callback:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
