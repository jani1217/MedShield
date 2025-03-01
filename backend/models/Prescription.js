const mongoose = require("mongoose");

const PrescriptionSchema = new mongoose.Schema(
  {
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    patientId: { type: String, required: true },
    prescriptionFile: { type: String, required: true },
    qrCodeFile: { type: String, required: true },
    hashId: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Prescription", PrescriptionSchema);
