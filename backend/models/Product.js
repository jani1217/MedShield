const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  prod_id: { type: String, required: true, unique: true },
  prod_name: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  qty: { type: Number, required: true },
  expiry_date: { type: Date, required: true },
  producer_name: { type: String, required: true },
  customer_name: { type: String, required: true },
  production_date: { type: Date, required: true },
  status: { type: String, default: "Available" }, // Default status before selling
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
