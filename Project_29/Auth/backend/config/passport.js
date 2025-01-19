import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.model.js";

dotenv.config(); // Load environment variables from .env file

// Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:4001/api/auth/google/callback", // Backend callback URL
    },
    async (accessToken, _refreshToken, profile, done) => {
      try {
        const { id, displayName, emails, photos } = profile;
        const email = emails[0].value;

        // Find or create user in the database
        let user = await User.findOne({ googleId: id });
        if (!user) {
          user = new User({
            googleId: id,
            fullName: displayName,
            username: email,
            profilePic: photos[0]?.value,
          });
          await user.save();
        }

        // Generate JWT token after successful login
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
          expiresIn: "15d", // Set token expiry
        });

        return done(null, { user, token }); // Return user and token in the done callback
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Serialize user (store user ID in session or JWT token)
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user (find user by ID and attach to the request)
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
