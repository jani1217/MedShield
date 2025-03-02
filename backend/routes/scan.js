const express = require("express");
const multer = require("multer");
const Product = require("../models/Product");
const fs = require("fs");
const Jimp = require("jimp");
const QrCode = require("qrcode-reader");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// 🔹 Scan QR Code and Extract Data
async function scanQRCode(filePath) {
  try {
    const image = await Jimp.read(filePath);
    const qr = new QrCode();

    return new Promise((resolve, reject) => {
      qr.callback = (err, result) => {
        if (err || !result || !result.result) {
          return reject("QR Code could not be read");
        }
        resolve(result.result);
      };
      qr.decode(image.bitmap);
    });
  } catch (err) {
    console.error("❌ QR Scan Error:", err);
    return null;
  }
}

// 🔹 API Endpoint: Upload & Scan QR Code
router.post("/", upload.single("qr_code"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No QR code file uploaded" });

  try {
    console.log("🔹 Scanning QR Code...");

    // Step 1: Extract Product ID from QR Code
    const productID = await scanQRCode(req.file.path);
    
    // Always delete the file (whether success or failure)
    fs.unlink(req.file.path, (err) => {
      if (err) console.error("❌ Failed to delete uploaded file:", err);
    });

    if (!productID) return res.status(400).json({ error: "Invalid QR Code" });

    console.log("🔹 Extracted Product ID:", productID);

    // Step 2: Find Product in Database
    const product = await Product.findOne({ productId: productID });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Step 3: Send Product Details
    return res.json({
      message: "✅ Product verified successfully",
      product_id: product.productId,
      name: product.prod_name,
      manufacturer: product.producer_name,
      manufacture_date: product.manufacture_date,
      expiry_date: product.expiry_date,
    });

  } catch (err) {
    console.error("❌ Error processing request:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
