import mongoose from "mongoose";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import { License } from "../model/licenceModel.js";
import ErrorHandler from "../utils/errorhander.js";
import logger from "../utils/logger.js";

// Create License
export const createLicense = catchAsyncErrors(async (req, res, next) => {
    const { _id } = req.user;
    const { plan } = req.body;

    if (!plan) {
        return next(new ErrorHandler("Plan is required", 400));
    }

    const license = await createLicenseHelper(_id, plan);

    res.status(201).json({
        success: true,
        license,
    });
});

export const createLicenseHelper = async (userId, plan) => {
    const validFrom = new Date();
    const validTill = new Date();
    validTill.setFullYear(validFrom.getFullYear() + 1); // Set validity for one year

    const license = await License.create({
        userId,
        plan,
        validFrom,
        validTill,
        status: "active", // Default status
    });

    // Log the create operation 
    logger.info(`License created for user ${userId}: ${license._id}`);

    return license;
};

// // Get All Licenses
// export const getLicenses = catchAsyncErrors(async (req, res, next) => {
//     const { _id } = req.user;

//     const licenses = await getLicensesHelper(_id);

//     res.status(200).json({
//         success: true,
//         licenses,
//     });
// });

// // Get all licenses for a user
// export const getLicensesHelper = async (userId) => {
//     const licenses = await License.find({ userId });
//     return licenses;
// };

// Get All Licenses with Pagination
export const getLicenses = catchAsyncErrors(async (req, res, next) => {
    const { _id } = req.user;  // Get user ID from the authenticated user
    const { page = 1, limit = 2 } = req.query; // Default page 1, limit 2 per page

    const licenses = await getLicensesHelper(_id, page, limit);

    res.status(200).json({
        success: true,
        licenses,
    });
});

// Helper function to get licenses with pagination
export const getLicensesHelper = async (userId, page, limit) => {
    // Convert page and limit to numbers
    const skip = (page - 1) * limit;
    const licenses = await License.aggregate([
        {
            $match: { userId: new mongoose.Types.ObjectId(userId) } // Match by userId
        },
        {
            $skip: skip // Skip the data based on the page
        },
        {
            $limit: limit // Limit the number of documents per page
        },
        {
            $project: {
                _id: 1,
                userId: 1,
                plan: 1,
                validFrom: 1,
                validTill: 1,
                status: 1,
                createdAt: 1,
                updatedAt: 1
            } // Optional projection of the fields you want to return
        }
    ]);

    return licenses;
};

// Get Single License by ID
export const getLicenseById = catchAsyncErrors(async (req, res, next) => {
    const { _id } = req.user;
    const { licenseId } = req.params;

    const license = await getLicenseByIdHelper(_id, licenseId);

    res.status(200).json({
        success: true,
        license,
    });
});

// Get a single license by ID
export const getLicenseByIdHelper = async (userId, licenseId) => {
    const license = await License.findOne({ _id: licenseId });
    if (!license) {
        throw new ErrorHandler("License not found", 404);
    }

    return license;
};

// Update License Status
export const updateLicenseStatus = catchAsyncErrors(async (req, res, next) => {
    const { _id } = req.user;
    const { licenseId } = req.params;
    const { status } = req.body;

    if (!status) {
        return next(new ErrorHandler("Status is required", 400));
    }

    const updatedLicense = await updateLicenseStatusHelper(_id, licenseId, status);

    res.status(200).json({
        success: true,
        updatedLicense,
    });
});

// Update license status
export const updateLicenseStatusHelper = async (userId, licenseId, status) => {
    const validStatuses = ["active", "deactivated"];

    if (!validStatuses.includes(status)) {
        throw new ErrorHandler("Invalid status", 400);
    }

    const license = await License.findOneAndUpdate(
        { _id: licenseId, userId },
        { status },
        { new: true }
    );

    if (!license) {
        throw new ErrorHandler("License not found", 404);
    }
    // Log the update operation
    logger.info(`License updated: ${licenseId}, New Status: ${status}`);

    return license;
};

// Delete License
export const deleteLicense = catchAsyncErrors(async (req, res, next) => {
    const { _id } = req.user;
    const { licenseId } = req.params;

    const response = await deleteLicenseHelper(_id, licenseId);

    res.status(200).json(response);
});

// Delete a license
export const deleteLicenseHelper = async (userId, licenseId) => {
    const license = await License.findOneAndDelete({ _id: licenseId, userId });

    if (!license) {
        throw new ErrorHandler("License not found", 404);
    }

    // Log the delete operation
    logger.info(`License deleted: ${licenseId}`);

    return { message: "License deleted successfully" };
};
