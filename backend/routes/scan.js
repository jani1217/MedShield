const express = require("express");
const multer = require("multer");
const CryptoJS = require("crypto-js");
const Product = require("../models/Product"); // Adjusted path
const fs = require("fs");
const qrImage = require("qr-image");
const sharp = require("sharp");

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // File upload location

// **AES Decryption Function**
function decryptAES(encryptedText, key) {
  const bytes = CryptoJS.AES.decrypt(encryptedText, key);
  return bytes.toString(CryptoJS.enc.Utf8);
}

// **QR Code Scanner Function**
async function scanQRCode(filePath) {
  try {
    const imageBuffer = await sharp(filePath).grayscale().toBuffer();
    const qr = qrImage.imageSync(imageBuffer, { type: "png" });

    return qr.toString(); // Extracted encrypted data
  } catch (err) {
    console.error("❌ QR Code Scanning Error:", err);
    return null;
  }
}

// **QR Code API**
router.post("/", upload.single("qr_code"), async (req, res) => {
  try {
    const aesKey = req.body.aes_key;
    if (!req.file || !aesKey) return res.status(400).json({ error: "QR Code & AES Key required" });

    // Scan QR Code to get encrypted data
    const encryptedData = await scanQRCode(req.file.path);
    if (!encryptedData) return res.status(400).json({ error: "Invalid QR Code" });

    // Decrypt to get Product ID
    const productID = decryptAES(encryptedData, aesKey);
    if (!productID) return res.status(400).json({ error: "Decryption failed" });

    // Check in MongoDB
    const product = await Product.findOne({ product_id: productID });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Update status to "Sold"
    product.status = "Sold";
    await product.save();

    res.json({ message: "✅ Product verified & marked as Sold", product_id: productID, name: product.name });

    // Cleanup - Remove uploaded file
    fs.unlinkSync(req.file.path);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
