import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      unique: true,
      required: function () {
        return !this.password; // googleId is required only if no password is provided
      },
    },
    fullName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true, // Ensure unique usernames
    },
    profilePic: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: function () {
        return !this.googleId; // Password is required only if no googleId is provided
      },
    },
    resetPasswordToken: {
      type: String,
      default: null, // Token for password reset
    },
    resetPasswordExpires: {
      type: Date,
      default: null, // Expiry time for the reset token
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
