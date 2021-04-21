import mongoose from 'mongoose'

const eventSchema = mongoose.Schema({
  title: String,
  description: String,
  image: String,
  price: Number,

  city: String,
  street: String,
  houseNumber: String,
  zip: Number,

  dates: Array,
  startHrs: Number,
  startMins: Number,
  endHrs: Number,
  endMins: Number,

  author_id: String,
  author: String,
  firebaseRef: String,
  createdAt: {
    type: Number,
    default: Date.now(),
  },
})

const Event = mongoose.model('Event', eventSchema)

export default Event
