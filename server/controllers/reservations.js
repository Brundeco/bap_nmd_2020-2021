import Reservation from '../models/reservations.js'

export const getReservations = async (req, res) => {
  const { id } = req.params

  try {
    const reservations = await Reservation.find({ client_id: { $in: id } })
    res.status(200).json(reservations)
  } catch (err) {
    console.log(err)
  }
}

export const getReservation = async (req, res) => {
  const { id } = req.params
  try {
    const reservations = await Reservation.findById(id)
    res.status(200).json(reservations)
  } catch (err) {
    console.log(err)
  }
}

export const createReservation = async (req, res) => {
  const reservation = req.body
  const newReservation = new Reservation(reservation)

  try {
    await newReservation.save()
    res.status(201).send('Reservation successful!')
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

export const getCustomerReservations = async (req, res) => {
  const { id } = req.params

  try {
    const reservations = await Reservation.find({
      property_owner_id: { $in: id },
    })
    res.status(200).json(reservations)
  } catch (err) {
    console.log(err)
  }
}

export const getCustomerReservation = async (req, res) => {
  const { id } = req.params
  try {
    const reservations = await Reservation.findById(id)
    res.status(200).json(reservations)
  } catch (err) {
    console.log(err)
  }
}
