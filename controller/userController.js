import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import bcrypt from 'bcryptjs';
import { User } from "../model/userModel.js";
import ErrorHander from "../utils/errorhander.js";
import { sendToken } from "../utils/sendToken.js";

// Register User
export const registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password,confirm_password,role } = req.body;

  // Check if password and confirm password match
  if (password !== confirm_password) {
    return next(new ErrorHander("Passwords do not match", 400));
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return next(new ErrorHander("Email already in use", 400));
  }

  // Hash password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword, // Store hashed password
    role
  });

  res.status(201).json({
    success: true,
    message: "User created successfully",
    user: {
      name: user.name,
      email: user.email,
      role: user.role
    },
  });
});

// Login User
export const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email & password are provided
  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Please enter email & password" });
  }

  // Find user and include password field
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({ success: false, message: "Invalid email or password" });
  }

  // Check if password matches
  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    return res.status(401).json({ success: false, message: "Invalid email or password" });
  }

  // Send JWT token
  sendToken(user, 200, res);
});

// Logout User
export const logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// Get User Detail
export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  // Log to check if req.user is set correctly
  const user = await User.findById(req.user._id); // use _id to find the user

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// Get all users(admin)
export const getAllUser = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});