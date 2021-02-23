import mongoose from "mongoose";

const propertySchema = mongoose.Schema({
  title: String,
  images: Array,
  author_id: String,
  author: String,
});

const Property = mongoose.model("Property", propertySchema);

export default Property;
