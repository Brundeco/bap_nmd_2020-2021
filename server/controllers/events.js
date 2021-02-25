import Event from "../models/events.js";
import mongoose from "mongoose";

export const getEvents = async (req, res) => {
  console.log(req.user);

  try {
    const events = await Event.find();
    

    return res.status(200).json({events : events, user: req.user });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const getEvent = async (req, res) => {
  const { id } = req.params;

  try {
    console.log(req.user);

    const event = await Event.findById(id);

    res.status(200).json(event);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createEvent = async (req, res) => {
  const event = req.body;

  console.log(event)

  const newEvent = new Event(event);
  try {
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { title, description, author, datePublished, image } = req.body;

  console.log(req.body)

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updateEvent = {
    title,
    description,
    author,
    datePublished,
    image,
    _id: id,
  };

  await Event.findByIdAndUpdate(id, updateEvent, { new: true });

  res.json(updateEvent);
};
