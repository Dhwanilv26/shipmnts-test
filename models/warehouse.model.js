import mongoose from "mongoose";

const WareHouseSchema = new mongoose.Schema({
  location_code: {
    type: String,
    unique: true,
    required: true,
    enum: ["warehouse", "storage"],
    default: "warehouse",
    parent_location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ParentLocation",
    },
  },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

const WareHouse = mongoose.model("WareHouse", WareHouseSchema);
export default WareHouse;
