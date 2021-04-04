import Reservation from '../models/reservations.js'

export const getReservations = async (req, res) => {
  console.log(req.params.id)

  try {
    const reservations = await Reservation.find()
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
