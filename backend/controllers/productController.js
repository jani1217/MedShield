const Product = require("../models/Product");
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const QRCode = require("qrcode");

// Fetch all manufacturers
exports.getManufacturers = async (req, res) => {
  try {
    const manufacturers = await User.find({ role: "manufacturer" }).select("name");
    res.json(manufacturers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a Product
exports.addProduct = async (req, res) => {
  try {
    const { prod_name, producer_name, qty, manufacture_date, expiry_date } = req.body;

    // Basic Validations
    if (!prod_name || !producer_name) {
      return res.status(400).json({ error: "Product name and manufacturer are required." });
    }

    if (prod_name.length < 3 || producer_name.length < 3) {
      return res.status(400).json({ error: "Product name and manufacturer must be at least 3 characters long." });
    }

    if (!Number.isInteger(qty) || qty <= 0) {
      return res.status(400).json({ error: "Quantity must be a positive integer." });
    }

    if (new Date(expiry_date) <= new Date(manufacture_date)) {
      return res.status(400).json({ error: "Expiry date must be after the production date." });
    }

    // ✅ Generate Unique Product ID (Ensuring it's Unique)
    let productId;
    let isUnique = false;

    while (!isUnique) {
      const serialNumber = Math.floor(1000 + Math.random() * 9000);
      productId = `${prod_name.slice(0, 3).toUpperCase()}${serialNumber}${producer_name.slice(0, 3).toUpperCase()}`;

      const existingProduct = await Product.findOne({ prod_id: productId });
      if (!existingProduct) {
        isUnique = true;
      }
    }

    // 🔒 Encrypt Product ID
    const secretKey = process.env.SECRET_KEY || "fallback_secret";
    let encryptedProductId;
    
    try {
      encryptedProductId = CryptoJS.AES.encrypt(productId, secretKey).toString();
    } catch (error) {
      console.error("❌ Encryption Failed:", error);
      return res.status(500).json({ error: "Encryption failed, unable to generate product ID." });
    }

    // ✅ Generate QR Code (Contains Encrypted Product ID)
    const qrCodeDataURL = await QRCode.toDataURL(encryptedProductId);

    // 🔥 Create New Product
    const newProduct = new Product({
      prod_id: encryptedProductId,  // 🔒 Encrypted ID
      productId,  // ✅ Readable Unique ID
      prod_name,
      timestamp: new Date(),
      qty,
      expiry_date: new Date(expiry_date),
      producer_name,
      production_date: new Date(manufacture_date),
      status: "Available",
      customer_name: "N/A",
      qr_code: qrCodeDataURL,  // 📌 Store QR Code in DB
    });

    await newProduct.save();
    res.json({ 
      message: "✅ Product added successfully!", 
      productId, 
      qrCode: qrCodeDataURL  // ⬇️ Return QR Code
    });

  } catch (err) {
    console.error("❌ Error adding product:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
