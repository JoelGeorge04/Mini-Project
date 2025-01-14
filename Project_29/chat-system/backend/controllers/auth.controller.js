import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import sendEmail from "../utils/sendEmail.js";

export const signup = async (req, res) => {
    try {
        const { fullName, userName, password, confirmPassword } = req.body;

        // Validate required fields
        if (!fullName || !userName || !password || !confirmPassword ) {
            return res.status(400).json({ error: "All fields are required" });
        }


        // Validate passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords don't match" });
        }

        // Validate password strength
        if (password.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters long" });
        }

        // Check if username already exists
        const existingUser = await User.findOne({ userName });
        if (existingUser) {
            return res.status(400).json({ error: "Username already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Generate profile picture URLs
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
        // Create new user instance
        const newUser = new User({
            fullName,
            userName,
            password: hashedPassword,
            profilePic: boyProfilePic,
        });

        // Save user to database
        await newUser.save();

       

        // Generate token and set cookie
        generateTokenAndSetCookie(newUser._id, res);

        // Respond with success
        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            userName: newUser.userName,
            profilePic: newUser.profilePic,
        });
         //send email
         sendEmail(newUser.userName, newUser.fullName);       
         return newUser;
    } catch (error) {
        console.error("Error in signup controller", error.message);

        // Handle MongoDB duplicate key error specifically
        if (error.code === 11000) {
            return res.status(400).json({
                error: "Duplicate username detected. Please choose a different username.",
            });
        }

        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const login = async (req, res) => {
	try {
		const { userName, password } = req.body;
		const user = await User.findOne({ userName });
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

		if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid username or password" });
		}

		generateTokenAndSetCookie(user._id, res);

		res.status(200).json({
			_id: user._id,
			fullName: user.fullName,
			userName: user.userName,
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
