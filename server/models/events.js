import mongoose from "mongoose";

const eventSchema = mongoose.Schema({
  title: String,
  description: String,
  city: String,
  street: String,
  houseNumber: Number,
  zip: Number,
  attendees: {
    type: Number,
    default: 0,
  },
  datePublished: {
    type: Date,
    default: new Date(),
  },
  author: String,
  image: String,
});

const Event = mongoose.model("Event", eventSchema);

export default Event;
