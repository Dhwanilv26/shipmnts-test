import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  transaction_date: {
    type: Date,
    default: Date.now,
  },
  product_code: {
    type: String,
    required: true,
    unique: true,
  },
  qty: {
    type: Number,
    required: true,
    min: 0,
  },
  volume: {
    type: Number,
    min: 0,
  },
  location_code: {
    type: String,
    unique: true,
    required: true,
  },
  status: {
    type: String,
    enum: ["delivered", "pending"],
    default: "pending",
  },
});

const Product = mongoose.model("Product", ProductSchema);
export default Product;
