import jwt from "jsonwebtoken";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";

export const sendToken =catchAsyncErrors((user, statusCode, res) => {
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );

  // Set token in the cookie
  res.cookie("token", token, {
    httpOnly: true, // This ensures the cookie is not accessible via JavaScript (mitigates XSS attacks)
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // Token expires in 24 hours
    secure: process.env.NODE_ENV === "production", // Set to true if using HTTPS
  });

  res.status(statusCode).json({
    success: true,
    token,
  });
}) ;
