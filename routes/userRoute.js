import express from "express";
import { getAllUser, getUserDetails, loginUser, logout, registerUser } from "../controller/userController.js";
import { isAuthenticatedUser,authorizeRoles } from "../utils/auth.js";
const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logout);

router.route("/me").get(isAuthenticatedUser,getUserDetails);

router.route("/admin/users").get(isAuthenticatedUser, authorizeRoles("admin"), getAllUser);

export default router;