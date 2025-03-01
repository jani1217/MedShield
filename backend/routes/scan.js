const express = require("express");
const multer = require("multer");
const CryptoJS = require("crypto-js");
const Product = require("../models/Product");
const fs = require("fs");
const Jimp = require("jimp");
const { promisify } = require("util");
const qrcode = require("qrcode-reader");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// 🔹 AES Decryption Function
function decryptAES(encryptedText, key) {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedText, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error("Decryption Error:", error);
    return null;
  }
}

// 🔹 Scan QR Code and Extract Data
async function scanQRCode(filePath) {
  try {
    const image = await Jimp.read(filePath);
    const qr = new qrcode();

    return new Promise((resolve, reject) => {
      qr.callback = (err, result) => {
        if (err || !result || !result.result) {
          reject("QR Code could not be read");
        } else {
          resolve(result.result);
        }
      };
      qr.decode(image.bitmap);
    });
  } catch (err) {
    console.error("QR Scan Error:", err);
    return null;
  }
}

// 🔹 API Endpoint: Upload & Decrypt QR Code
router.post("/scanner", upload.single("qr_code"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No QR code file uploaded" });

  const aesKey = req.body.aes_key || "thisisasecretkey"; // Key should match encryption key

  try {
    console.log("🔹 Scanning QR Code...");
    
    // Step 1: Extract Encrypted Data from QR Code
    const encryptedData = await scanQRCode(req.file.path);
    fs.unlinkSync(req.file.path); // Cleanup

    if (!encryptedData) return res.status(400).json({ error: "Invalid QR Code" });
    console.log("🔹 Extracted Encrypted Data:", encryptedData);

    // Step 2: Decrypt QR Data
    const productID = decryptAES(encryptedData, aesKey);
    if (!productID) return res.status(400).json({ error: "Decryption failed" });
    console.log("🔹 Decrypted Product ID:", productID);

    // Step 3: Find Product in Database
    const product = await Product.findOne({ productId: productID });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Step 4: Send Product Details
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
