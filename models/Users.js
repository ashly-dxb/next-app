// models/Users.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide username"],
    maxlength: [30, "Username cannot be more than 30 characters"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    maxlength: [30, "Email cannot be more than 30 characters"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    maxlength: [100, "Password cannot be more than 100 characters"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const User = mongoose.models.Users || mongoose.model("Users", UserSchema);
export default User;
