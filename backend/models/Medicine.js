const mongoose = require('mongoose');

const MedicineSchema = new mongoose.Schema({
    name: { type: String, required: true },
    batchNumber: { type: String, required: true, unique: true },
    manufacturer: { type: String, required: true },
    expiryDate: { type: Date, required: true },
    verified: { type: Boolean, default: false } // If the medicine is genuine
}, { timestamps: true });

module.exports = mongoose.model('Medicine', MedicineSchema);
