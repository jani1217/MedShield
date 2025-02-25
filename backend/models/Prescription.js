const mongoose = require('mongoose');

const PrescriptionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    imageUrl: { type: String, required: true }, // URL of the uploaded prescription
    verified: { type: Boolean, default: false } // Verified by pharmacy or not
}, { timestamps: true });

module.exports = mongoose.model('Prescription', PrescriptionSchema);
