import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
	try {
		const token = req.cookies.jwt;

		if (!token) {
			return res.status(401).json({ error: "Unauthorized - No Token Provided" });
		}

		// Verify token
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		if (!decoded) {
			return res.status(401).json({ error: "Unauthorized - Invalid Token" });
		}

		// Fetch user data
		const user = await User.findById(decoded.userId).select("-password");
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		req.user = user;
		next(); // ✅ Proceed to the next middleware
	} catch (error) {
		console.error("Error in protectRoute middleware:", error.message);

		// Handle JWT-specific errors properly
		if (error.name === "JsonWebTokenError") {
			return res.status(401).json({ error: "Invalid Token" });
		} else if (error.name === "TokenExpiredError") {
			return res.status(401).json({ error: "Token Expired" });
		}

		return res.status(500).json({ error: "Internal Server Error" });
	}
};

export default protectRoute;
