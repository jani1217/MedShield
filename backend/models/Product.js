const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  prod_id: { type: String, required: true, unique: true }, // Encrypted Product ID
  productId: { type: String, required: true, unique: true }, // ✅ Explicitly added
  prod_name: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  qty: { type: Number, required: true },
  expiry_date: { type: Date, required: true },
  producer_name: { type: String, required: true },
  customer_name: { type: String, required: true },
  production_date: { type: Date, required: true },
  status: { type: String, default: "Available" }, // Default status before selling
  qr_code: { type: String }, // 🔥 Store QR Code as Base64

});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
