import mongoose from "mongoose";

const propertySchema = mongoose.Schema({
  description: String,
  price: Number,
  surface: Number,
  light: String,
  dates: Array,

  city: String,
  street: String,
  houseNumber: Number,
  zip: Number,

  email: String,
  phone: Number,
  firstname: String,
  lastname: String,

  images: Array,
  author_id: String,
  author: String,
  createdAt: {
    type: Number,
    default: Date.now(),
  },
});

const Property = mongoose.model("Property", propertySchema);

export default Property;
