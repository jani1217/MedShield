require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const productRoutes = require("./routes/productRoutes");
// Middleware (MOVE THIS UP)
app.use(express.json());
app.use(cors());

// Import Models and Routes
const User = require('./models/User');
const Prescription = require('./models/Prescription');
const Medicine = require('./models/Medicine');
const authRoutes = require('./routes/auth');
const prescriptionRoutes = require("./routes/prescription");
const complaintRoutes = require("./routes/compla");
app.use("/api/prescriptions", prescriptionRoutes);

// Use Routes
app.use('/api/auth', authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/comp", complaintRoutes);

// Database Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error(err));

// Root Route
app.get("/", (req, res) => {
    res.send("MedShield Backend Running 🚀");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));