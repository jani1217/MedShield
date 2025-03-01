require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");

const app = express();

// Middleware
app.use(express.json());  // To parse JSON data
app.use(cors());  // To allow Cross-Origin requests

// Import Routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/productRoutes');
const complaintRoutes = require('./routes/compla');
const prescriptionRoutes = require("./routes/prescription");  // Prescription route

// Use Routes
app.use('/api/auth', authRoutes); // Authentication Routes
app.use("/api/products", productRoutes); // Product Routes
app.use("/api/comp", complaintRoutes); // Complaint Routes
app.use("/api/prescriptions", prescriptionRoutes);  // Prefix for prescriptions

// Database Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("Error connecting to MongoDB:", err));

// Root Route
app.get("/", (req, res) => {
    res.send("MedShield Backend Running 🚀");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
