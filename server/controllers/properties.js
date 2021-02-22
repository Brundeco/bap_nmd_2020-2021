import Property from "../models/properties.js";

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
  console.log('controller fnuctoon fired')

  const newProperty = new Property(property);
  try {
    await newProperty.save();
    res.status(201).json(newProperty);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
