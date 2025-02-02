import mongoose from "mongoose";

const licenseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming you have a User model
    required: true,
  },
  plan: {
    type: String,
    required: true,
    enum: ["PRO", "BASIC", "ENTERPRISE"], // Example plans
  },
  validFrom: {
    type: Date,
    required: true,
  },
  validTill: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    default: "active", // Default status is active
    enum: ["active", "deactivated"],
  },
});

export const License = mongoose.model("License", licenseSchema);
