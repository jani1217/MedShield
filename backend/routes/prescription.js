const express = require("express");
const multer = require("multer");
const path = require("path");
const { body, validationResult } = require("express-validator");
const Prescription = require("../models/Prescription");  // Ensure this is your Prescription model
const User = require("../models/User");  // To validate the doctor ID
const authMiddleware = require("../middleware/authMiddleware");  // Authentication middleware

const router = express.Router();

// Set up multer for file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./uploads"); // Make sure the `uploads` folder exists
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  }),
});

// POST: Upload Prescription
router.post(
  "/upload",
  authMiddleware, // Protect the route, ensuring the user is authenticated
  upload.fields([
    { name: "prescription", maxCount: 1 },
    { name: "qrCode", maxCount: 1 },
  ]),
  async (req, res) => {
    const { doctorId, patientId, hashId } = req.body;

    // Check if all required fields are present
    if (!doctorId || !patientId || !hashId || !req.files["prescription"] || !req.files["qrCode"]) {
      return res.status(400).json({ msg: "Please fill in all fields and upload files." });
    }

    try {
      // Validate if the doctor exists
      const doctor = await User.findById(doctorId);
      if (!doctor || doctor.role !== "doctor") {
        return res.status(400).json({ msg: "Doctor ID is invalid or user is not a doctor." });
      }

      // Save the new prescription to the database
      const newPrescription = new Prescription({
        doctorId,
        patientId,
        prescriptionFile: req.files["prescription"][0].path, // Save the file path
        qrCodeFile: req.files["qrCode"][0].path, // Save the QR code file path
        hashId,
      });

      await newPrescription.save();

      // Respond with the saved prescription data
      res.status(201).json({
        prescriptionId: newPrescription._id,
        message: "Prescription uploaded successfully.",
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Server error. Could not upload prescription." });
    }
  }
);

module.exports = router;
