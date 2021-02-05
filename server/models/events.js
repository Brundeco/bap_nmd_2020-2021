import mongoose from "mongoose";

const eventSchema = mongoose.Schema({
  title: String,
  description: String,
  address: String,
  attendees: {
    type: Number,
    default: 0,
  },
  datePublished: {
    type: Date,
    default: new Date(),
  },
  author: String,
});

const Event = mongoose.model("Event", eventSchema);

export default Event;
