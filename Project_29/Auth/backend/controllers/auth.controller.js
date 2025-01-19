import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import sendEmail from "../utils/sendMail.js";


export const signup = async (req, res) => {
	try {
		const { fullName, username, password, confirmPassword } = req.body;

		if (password !== confirmPassword) {
			return res.status(400).json({ error: "Passwords don't match" });
		}

		const user = await User.findOne({ username });

		if (user) {
			return res.status(400).json({ error: "Username already exists" });
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
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const logout = (req, res) => {
	try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

// Google OAuth handlers
export const googleCallback = async (req, res) => {
  try {
    const { id, displayName, emails, photos } = req.user;
    const email = emails[0].value;
    const profilePic = photos[0]?.value;

    // Check if user already exists in the database using the Google ID
    let user = await User.findOne({ googleId: id });

    if (!user) {
      // If user doesn't exist, create a new user
      user = new User({
        googleId: id,
        fullName: displayName,
        username: email,
        profilePic: profilePic,
      });

      await user.save(); // Save new user to the database
    }

    generateTokenAndSetCookie(user._id, res);

    // Send a welcome email to the new user logged in via Google
    await sendEmail(user.username, user.fullName); 

    res.redirect("http://localhost:3000/");

  } catch (error) {
    console.error("Error in Google callback", error.message);

    res.status(500).json({ error: "Internal Server Error" });
  }
};
