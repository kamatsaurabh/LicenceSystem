import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import jwt from 'jsonwebtoken';
import { User } from "../model/userModel.js";
import ErrorHandler from "./errorhander.js";

export const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please Login to access this resource", 401));
  }

  // Verify the token
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  // Set user information on request object
  req.user = await User.findById(decodedData.id);
  // Proceed to the next middleware or route handler
  next();
});


export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resouce `,
          403
        )
      );
    }

    next();
  };
};