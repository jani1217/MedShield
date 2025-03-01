const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const productController = require("../controllers/productController");

router.get("/manufacturers", productController.getManufacturers);

router.post("/add-product", productController.addProduct);


// @route GET /api/products
// @desc Fetch products where qty >= 20
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({ qty: { $gte: 0 } }); // Filter products with qty >= 20
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products", error: err });
  }
});

module.exports = router;
