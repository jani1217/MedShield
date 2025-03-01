const Product = require("../models/Product");
const User = require("../models/User");

// Fetch all manufacturers (users with role = "manufacturer")
exports.getManufacturers = async (req, res) => {
  try {
    const manufacturers = await User.find({ role: "manufacturer" }).select("name");
    res.json(manufacturers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new product
exports.addProduct = async (req, res) => {
  try {
    const { prod_name, producer_name } = req.body;

    if (!prod_name || !producer_name) {
      return res.status(400).json({ error: "Product name and manufacturer are required" });
    }

    // Generate random product details
    const newProduct = new Product({
      prod_id: "P" + Math.floor(1000 + Math.random() * 9000), // Random product ID
      prod_name,
      timestamp: new Date(),
      qty: Math.floor(Math.random() * 50) + 1, // Random quantity (1-50)
      expiry_date: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), // 1 year from now
      producer_name,
      customer_name: "N/A",
      production_date: new Date(),
      status: "Available",
    });

    await newProduct.save();
    res.json({ message: "✅ Product added successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
