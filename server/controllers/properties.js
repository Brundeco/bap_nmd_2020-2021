import Property from "../models/properties.js";
import mongoose from "mongoose";

export const getProperties = async (req, res) => {
  try {
    const properties = await Property.find();

    res.status(200).json(properties);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getProperty = async (req, res) => {
  const { id } = req.params;

  try {
    const property = await Property.findById(id);

    res.status(200).json(property);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createProperty = async (req, res) => {
  const property = req.body;

  const newProperty = new Property(property);
  try {
    await newProperty.save();
    console.log("Property added");
    res.status(201).send("Property added");
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateProperty = async (req, res) => {
  const { id } = req.params;
  const {
    images,
    dates,
    description,
    price,
    surface,
    light,
    street,
    zip,
    city,
    email,
    firstname,
    lastname,
    houseNumber,
    phone,
  } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  try {
    const updateProperty = {
      images,
      dates,
      description,
      price,
      surface,
      light,
      street,
      zip,
      city,
      email,
      firstname,
      lastname,
      houseNumber,
      phone,
    };

    await Property.findByIdAndUpdate(id, updateProperty, { new: true });

    res.json(updateProperty);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const bookProperty = async (req, res) => {
  const { id } = req.params;
  const reservations = req.body;
  console.log(reservations);

  if (!mongoose.Types.ObjectId.isValid(id))
    console.log("Post with this id could not be found");

  try {
    const property = await Property.findById(id);
    const dates = property.dates;
    const newDates = dates.filter((val) => !reservations.includes(val));
    const updateProperty = {
      dates: newDates,
    };

    await Property.findByIdAndUpdate(id, updateProperty, { new: true });
    res.json(updateProperty);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPropertiesAdmin = async (req, res) => {
  console.log(req.body);
  try {
    const user = req.body;
    const properties = await Property.find({ author_id: user.id });
    console.log(properties);
    res.status(200).json(properties);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
