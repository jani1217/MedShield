const express = require("express");
const { body, validationResult } = require("express-validator");
const Prescription = require("../models/Prescription");  // Ensure you have a Prescription model
const authMiddleware = require("../middleware/authMiddleware"); // Ensure this file exists

const router = express.Router();

/**
 * @route   GET /api/prescriptions
 * @desc    Get all prescriptions for the logged-in user
 * @access  Private (Requires authentication)
 */
router.get("/", authMiddleware, async (req, res) => {
    try {
        const prescriptions = await Prescription.find();  // Fetch all prescriptions
        res.json(prescriptions);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

/**
 * @route   POST /api/prescriptions
 * @desc    Create a new prescription
 * @access  Private (Requires authentication)
 */
router.post(
    "/",
    [
        authMiddleware, // Protect the route
        body("patientId", "Patient ID is required").notEmpty(),
        body("doctorId", "Doctor ID is required").notEmpty(),
        body("medicines", "Medicines list is required").isArray({ min: 1 }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { patientId, doctorId, medicines } = req.body;

        try {
            const newPrescription = new Prescription({
                patientId,
                doctorId,
                medicines,
                date: new Date(),
            });

            await newPrescription.save();
            res.status(201).json(newPrescription);
        } catch (err) {
            console.error(err);
            res.status(500).send("Server Error");
        }
    }
);

module.exports = router;
