import mongoose from "mongoose";

const eventSchema = mongoose.Schema({
  title: String,
  description: String,
  city: String,
  street: String,
  houseNumber: Number,
  zip: Number,
  date: Date,
  startHrs: Number,
  startMins: Number,
  endHrs: Number,
  endMins: Number,
  image: String,
  author_id: String,
  author: String,
  createdAt: {
    type: Number,
    default: Date.now(),
  },
});

const Event = mongoose.model("Event", eventSchema);

export default Event;
