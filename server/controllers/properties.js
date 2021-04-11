import Property from '../models/properties.js'
import mongoose from 'mongoose'
import Stripe from 'stripe'
import dotenv from 'dotenv'

dotenv.config()
const stripe = new Stripe(process.env.NEW_STRIPE_SECRET_TEST)

export const getProperties = async (req, res) => {
  try {
    const properties = await Property.find()

    res.status(200).json(properties)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getProperty = async (req, res) => {
  const { id } = req.params

  try {
    const property = await Property.findById(id)

    res.status(200).json(property)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const createProperty = async (req, res) => {
  const property = req.body

  const newProperty = new Property(property)
  try {
    await newProperty.save()
    console.log('Property added')
    res.status(201).send('Property added')
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

export const updateProperty = async (req, res) => {
  const { id } = req.params
  const property = req.body

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`)

  try {
    await Property.findByIdAndUpdate(id, property, { new: true })
    res.json(property)
  } catch (error) {
    console.log(error)
    res.status(404).json({ message: error.message })
  }
}

export const bookProperty = async (req, res) => {
  const { id } = req.params
  const reservations = req.body
  console.log(reservations)

  if (!mongoose.Types.ObjectId.isValid(id))
    console.log('Post with this id could not be found')

  try {
    const property = await Property.findById(id)
    const dates = property.dates
    const newDates = dates.filter((val) => !reservations.includes(val))
    const updateProperty = {
      dates: newDates,
    }

    await Property.findByIdAndUpdate(id, updateProperty, { new: true })
    res.json(updateProperty)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getPropertiesAdmin = async (req, res) => {
  console.log(req.body)
  try {
    const user = req.body
    const properties = await Property.find({ author_id: user.id })
    console.log(properties)
    res.status(200).json(properties)
  } catch (error) {
    console.log(error)
    res.status(404).json({ message: error.message })
  }
}

export const getLikes = async (req, res) => {
  console.log(req.body)

  try {
    const likedProps = await Property.find({ _id: { $in: req.body.likes } })

    console.log(likedProps)

    res.status(200).json(likedProps)
  } catch (error) {
    console.log(error)
    res.status(404).json({ message: error.message })
  }
}

export const makePayment = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { amount } = req.body
      // Psst. For production-ready applications we recommend not using the
      // amount directly from the client without verifying it first. This is to
      // prevent bad actors from changing the total amount on the client before
      // it gets sent to the server. A good approach is to send the quantity of
      // a uniquely identifiable product and calculate the total price server-side.
      // Then, you would only fulfill orders using the quantity you charged for.

      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'eur',
      })

      res.status(200).send(paymentIntent.client_secret)
    } catch (err) {
      console.log(err.message)
      // res.status(500).json({ statusCode: 500, message: err.message })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}

// export const makePaymentBancontact = async (req, res) => {
//   if (req.method === 'POST') {
//     try {
//       const { amount } = req.body
//       const paymentIntent = await stripe.paymentIntents.create({
//         amount,
//         currency: 'eur',
//         payment_method_types: ['bancontact'],
//       })

//       res.status(200).send(paymentIntent.client_secret)
//     } catch (err) {
//       res.status(500).json({ statusCode: 500, message: err.message })
//     }
//   } else {
//     res.setHeader('Allow', 'POST')
//     res.status(405).end('Method Not Allowed')
//   }
// }
