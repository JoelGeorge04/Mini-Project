import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1h", // Token expiration time
  });

  res.cookie("jwt", token, {
    maxAge: 1 * 60 * 60 * 1000, // 1 hour
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production", // Make sure it's secure in production
  });

  return token;
};

export default generateTokenAndSetCookie;
