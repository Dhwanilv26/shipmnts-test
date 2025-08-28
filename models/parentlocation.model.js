import mongoose from "mongoose";

const ParentLocationSchema = new mongoose.Schema({
  parent_location: {
    type: String,
  },
});

const ParentLocation = mongoose.model("ParentLocation", ParentLocationSchema);
export default ParentLocation;
