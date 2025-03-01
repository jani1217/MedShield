require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Import Routes
const authRoutes = require("./routes/auth");
const prescriptionRoutes = require("./routes/prescription");
const complaintRoutes = require("./routes/compla");
const scanRoutes = require("./routes/scan"); // ✅ Include Scan API
const productRoutes = require("./routes/productRoutes");

// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/prescriptions", prescriptionRoutes);
app.use("/api/comp", complaintRoutes);
app.use("/api/products", productRoutes);
app.use("/api/scan", scanRoutes); // ✅ Register Scan API

// Database Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });

// Root Route
app.get("/", (req, res) => {
  res.send("🚀 MedShield Backend Running");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🌍 Server running on port ${PORT}`));
