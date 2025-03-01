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

// 🔹 Helper Function: AES Decryption
function decryptAES(encryptedText, key) {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedText, key);
    return bytes.toString(CryptoJS.enc.Utf8); // Returns decrypted product ID
  } catch (error) {
    console.error("Decryption Error:", error);
    return null;
  }
}

// 🔹 Helper Function: Scan QR Code and Extract Hash
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

// 🔹 API: Upload QR Code, Scan & Verify Product
router.post("/scan", upload.single("qr_code"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const aesKey = req.body.aes_key || "thisisasecretkey"; // Use your encryption key
    console.log("🔹 Scanning QR Code...");
    
    // Step 1: Extract QR Code Hash
    const encryptedData = await scanQRCode(req.file.path);
    fs.unlinkSync(req.file.path); // Delete file after scanning

    if (!encryptedData) return res.status(400).json({ error: "Invalid QR Code" });
    console.log("🔹 QR Code Hash Extracted:", encryptedData);

    // Step 2: Decrypt QR Code Hash
    const productID = decryptAES(encryptedData, aesKey);
    if (!productID) return res.status(400).json({ error: "Decryption failed" });
    console.log("🔹 Decrypted Product ID:", productID);

    // Step 3: Search Product in Database
    const product = await Product.findOne({ prod_id: productID });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Step 4: Mark Product as Sold
    product.status = "Sold";
    await product.save();

    return res.json({
      message: "✅ Product verified & marked as Sold",
      product_id: product.prod_id,
      name: product.prod_name,
      producer: product.producer_name,
      expiry_date: product.expiry_date,
      production_date: product.production_date,
      customer: product.customer_name,
      status: product.status,
    });
  } catch (err) {
    console.error("❌ Error processing request:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
