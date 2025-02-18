import User from "../models/user.model.js";
import crypto from "crypto";
import { Op } from "sequelize";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import { oauth2Client } from "../utils/googleOAuth.js";
import sendEmail from "../utils/sendMail.js";
import passResetMail from '../utils/passResetMail.js';

// User Signup
export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ where: { username } });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const profilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;

    const newUser = await User.create({
      fullName,
      username,
      password: hashedPassword,
      profilePic,
    });

    generateTokenAndSetCookie(newUser.id, res);

    await sendEmail(newUser.username, newUser.fullName);

    res.status(201).json({
      id: newUser.id,
      fullName: newUser.fullName,
      username: newUser.username,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    console.error("Signup Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// User Login
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Fetch user from database
    const user = await User.findOne({ where: { username } });

    if (!user || !user.password) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    console.log("Stored Hashed Password (Login):", user.password);
    console.log("Entered Password:", password);

    // Compare password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password Match:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    generateTokenAndSetCookie(user.id, res);

    res.status(200).json({
      id: user.id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Logout
export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//Google Account
export const handleGoogleOAuth = async (token) => {
	try {
		console.log("Received Google OAuth token:", token);

		const ticket = await oauth2Client.verifyIdToken({
			idToken: token,
			audience: process.env.GOOGLE_CLIENT_ID,
		});

		if (!ticket) {
			console.error("Google Token Verification Failed");
			throw new Error("Invalid Google Token");
		}

		const payload = ticket.getPayload();
		console.log("Google Payload:", payload);

		let user = await User.findOne({ where: { username: payload.email } });

		if (!user) {
			user = await User.create({
				googleId: payload.sub,
				fullName: payload.name,
				username: payload.email,
				profilePic: payload.picture,
			});
			await sendEmail(user.username, user.fullName);
		}

		const jwtToken = generateTokenAndSetCookie(user.id); 

		// Return data instead of sending a response
		return { user, jwtToken };

	} catch (error) {
		console.error("Google OAuth Error:", error.message);
		throw new Error("Internal Server Error");
	}
};

//forgot password
export const forgotPassword = async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex"); // Generate secure token
    const resetTokenExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes expiry

    await user.update({ resetToken, resetTokenExpiry });

    const resetUrl = `http://localhost:3000/reset-password/${encodeURIComponent(resetToken)}`;
    await passResetMail(user.username, user.fullName, resetUrl);

    res.status(200).json({ message: "Password reset link sent to your email." });
  } catch (error) {
    console.error("Forgot Password Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    // Find the user with the valid reset token
    const user = await User.findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: { [Op.gt]: Date.now() }, // Ensure token is still valid
      },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user password and remove reset fields
    user.password = hashedPassword;
    user.resetPasswordToken = null; 
    user.resetPasswordExpires = null; 

    await user.save(); 

    res.status(200).json({ message: "Password reset successful." });
  } catch (error) {
    console.error("Reset Password Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Validate Reset Token
export const resetPasswordPage = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({
      where: { resetToken: token, resetTokenExpiry: { [Op.gt]: Date.now() } },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    res.status(200).json({ message: "Valid token." });
  } catch (error) {
    console.error("Validate Reset Token Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
