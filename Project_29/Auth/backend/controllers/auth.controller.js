import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import { oauth2Client } from "../utils/googleOAuth.js";
import sendEmail from "../utils/sendMail.js";
import passResetMail from '../utils/passResetMail.js';


// Signup user
export const signup = async (req, res) => {
	try {
		const { fullName, username, password, confirmPassword } = req.body;

		if (password !== confirmPassword) {
			return res.status(400).json({ error: "Passwords don't match" });
		}

		const user = await User.findOne({ username });

		if (user) {
			return res.status(400).json({ error: "User already exists" });
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;

		const newUser = new User({
			fullName,
			username,
			password: hashedPassword,
			profilePic: boyProfilePic,
		});

		if (newUser) {
			generateTokenAndSetCookie(newUser._id, res);

			await newUser.save();

			// Send a welcome email
			await sendEmail(newUser.username, newUser.fullName);

			res.status(201).json({
				_id: newUser._id,
				fullName: newUser.fullName,
				username: newUser.username,
				profilePic: newUser.profilePic,
			});
		} else {
			res.status(400).json({ error: "Invalid user data" });
		}
	} catch (error) {
		console.log("Error in signup controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

// Login Controller
export const login = async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

		if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid username or password" });
		}

		generateTokenAndSetCookie(user._id, res);

		res.status(200).json({
			_id: user._id,
			fullName: user.fullName,
			username: user.username,
			profilePic: user.profilePic,
		});
	} catch (error) {
		console.error("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

// Logout user
export const logout = (req, res) => {
	try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};


// Google login/signup 
export const handleGoogleOAuth = async (token, res) => {
	try {
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

			// Send a welcome email to the new user logged in via Google
			await sendEmail(user.username, user.fullName);
			await user.save();
		}

		// Generate token and set the cookie
		const jwtToken = generateTokenAndSetCookie(user._id, res);

		return { user, jwtToken };
	} catch (error) {
		throw new Error("Internal server error");
	}
};

// Forgot Password
export const forgotPassword = async (req, res) => {
  try {
    const { username } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Generate reset token and expiry
    const resetToken = generateTokenAndSetCookie(user._id, res, 15 * 60); // 15 minutes
    const resetTokenExpiry = Date.now() + 15 * 60 * 1000; // Set expiry

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpiry;
    await user.save();

    // Generate reset URL
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

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }, // Check if token is valid
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ message: "Password reset successful." });
  } catch (error) {
    console.error("Reset Password Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Validate Reset Token
export const resetPasswordPage = async (req, res) => {
  const { token } = req.params;
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
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
