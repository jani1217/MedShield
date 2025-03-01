const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ["user", "doctor", "pharmacist", "rootuser", "manufacturer", "admin"], 
    default: "user" 
  },
  doctorId: { 
    type: String, 
    required: function() { return this.role === "doctor"; }, // doctorId is required only if role is doctor
    unique: true, // Ensure doctorId is unique
  }
});

module.exports = mongoose.model("User", UserSchema);
