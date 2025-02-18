import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res = null, expiresIn = "1h") => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn, // Default: 1 hour, can be overridden
  });

  if (res) {
    res.cookie("jwt", token, {
      maxAge: expiresIn === "1h" ? 1 * 60 * 60 * 1000 : parseInt(expiresIn) * 1000, // Convert seconds to ms
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production", // Secure in production
    });
  }

  return token;
};

export default generateTokenAndSetCookie;
