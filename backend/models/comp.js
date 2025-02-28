const mongoose = require("mongoose");

const ComplaintSchema = new mongoose.Schema({
  prod_id: { type: String, required: true, unique: true },
  type_com: { type: String, required: true },
  description: { type: String, required: true }, // ✅ Fixed lowercase field name
}, { collection: "comp" }); // ✅ Explicit collection name if needed

const Complain = mongoose.model("Complain", ComplaintSchema);
module.exports = Complain;
