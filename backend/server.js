require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ✅ Fix CORS Issue
const allowedOrigins = [
    "https://med-shield.vercel.app",  // Deployed Frontend
    "http://localhost:3000"  // Local Development
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

app.use(express.json());

// Import Routes
const authRoutes = require("./routes/auth");
const prescriptionRoutes = require("./routes/prescription");

// ✅ Ensure correct API paths
app.use("/api/auth", authRoutes);
app.use("/api/prescriptions", prescriptionRoutes);

// ✅ Database Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

// ✅ Test Root Route
app.get("/", (req, res) => {
    res.send("✅ MedShield Backend Running 🚀");
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
