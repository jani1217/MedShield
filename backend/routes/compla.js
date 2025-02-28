const express = require("express");
const router = express.Router();
const Complain = require("../models/comp");

// ✅ Fetch complaints (ensure collection is correct)
router.get("/", async (req, res) => {
  try {
    const complaints = await Complain.find();
    res.json(complaints);
  } catch (err) {
    console.error("Error fetching complaints:", err);
    res.status(500).json({ message: "Error fetching complaints", error: err.message });
  }
});

module.exports = router;
