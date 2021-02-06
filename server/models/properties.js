import mongoose from "mongoose";

const propertySchema = mongoose.Schema({
  title: String,
  images: Array,
});

const Property = mongoose.model("Property", propertySchema);

export default Property;
