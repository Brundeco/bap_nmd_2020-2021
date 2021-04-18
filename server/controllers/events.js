import Event from '../models/events.js'
import mongoose from 'mongoose'

export const getEvents = async (req, res) => {
  console.log(req.user)

  try {
    const events = await Event.find()

    return res.status(200).json({ events: events, user: req.user })
  } catch (error) {
    return res.status(404).json({ message: error.message })
  }
}

export const getEvent = async (req, res) => {
  const { id } = req.params

  try {
    console.log(req.user)

    const event = await Event.findById(id)

    res.status(200).json(event)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getLikes = async (req, res) => {
  console.log(req.body)

  try {
    const likedEvents = await Event.find({ _id: { $in: req.body.likes } })

    console.log(likedEvents)

    res.status(200).json(likedEvents)
  } catch (error) {
    console.log(error)
    res.status(404).json({ message: error.message })
  }
}

export const createEvent = async (req, res) => {
  const event = req.body

  console.log(event)

  const newEvent = new Event(event)
  try {
    await newEvent.save()
    res.status(201).json(newEvent)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

export const updateEvent = async (req, res) => {
  const { id } = req.params
  const event = req.body

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`)

  const newEvent = new Event(event)
  console.log('Lets update this record')

  await Event.findByIdAndUpdate(id, newEvent, { new: true })

  res.json(updateEvent)
}

export const getEventsAdmin = async (req, res) => {
  console.log(req.body)
  try {
    const user = req.body
    const events = await Event.find({ author_id: user.id })
    console.log(events)
    res.status(200).json(events)
  } catch (error) {
    console.log(error)
    res.status(404).json({ message: error.message })
  }
}

export const filterMostRecent = async (req, res) => {
  console.log('yeet')
  try {
    const events = await Event.find().sort({ _id: -1 })
    res.status(200).json(events)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const filterLessRecent = async (req, res) => {
  try {
    const events = await Event.find().sort({ _id: 1 })
    res.status(200).json(events)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const filterGetAutocomplete = async (req, res) => {
  try {
    const events = await Event.find({}).select({ title: 1, street: 1, _id: 0 })
    res.status(200).json(events)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const filterPostAutocomplete = async (req, res) => {
  console.log(req.body)
  try {
    // const events = await Event.find({
    //   title: { $regex: `.*${req.body.search}.*` },
    // })
    const events = await Event.find({
      $or: [
        { title: { $regex: `.*${req.body.search}.*` } },
        { street: { $regex: `.*${req.body.search}.*` } },
      ],
    })
    res.status(200).json(events)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

// export const filterDateRange = async (req, res) => {
//   const dateRange = req.body.dateRange
//   console.log(dateRange)

//   try {
//     const events = await Event.find({
//       dates: { $gte: dateRange.startdata, $lte: dateRange.endDate },
//     }).sort({ price: 1 })

//     res.status(200).json(events)
//   } catch (error) {
//     res.status(404).json({ message: error.message })
//   }
// }

export const filterFree = async (req, res) => {
  try {
    const events = await Event.find({
      price: { $gte: priceRange.minVal, $lte: priceRange.maxVal },
    }).sort({ price: 1 })

    res.status(200).json(events)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}
