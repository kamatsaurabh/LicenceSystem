import express from "express";
import { isAuthenticatedUser,authorizeRoles } from "../utils/auth.js";
import { createLicense, deleteLicense, getLicenseById, getLicenses, updateLicenseStatus } from "../controller/licenceController.js";
const router = express.Router();

router.route("/licences").post(isAuthenticatedUser, authorizeRoles("admin"),createLicense);
router.route("/licences").get(isAuthenticatedUser, authorizeRoles("admin"),getLicenses);

router.route("/:licenseId").get(isAuthenticatedUser, authorizeRoles("admin"), getLicenseById)
.put(isAuthenticatedUser, authorizeRoles("admin"),updateLicenseStatus)
.delete(isAuthenticatedUser, authorizeRoles("admin"), deleteLicense);


export default router;