import mongoose from 'mongoose'

const reservationSchema = mongoose.Schema({
  dates: Array,
  price: Number,

  property_owner_id: String,
  property_owner_firstname: String,
  property_owner_lastname: String,
  property_owner_email: String,
  property_owner_phone: String,

  property_id: String,
  property_address: String,

  client_id: String,

  firebase_ref: String,
  image: String,

  createdAt: {
    type: Number,
    default: Date.now(),
  },
})

const Reservation = mongoose.model('Reservation', reservationSchema)

export default Reservation
