import Messages from "../models/messages.js";
import mongoose from "mongoose";

export const getMessages = async (req, res) => {

  const fromTo = req.body.from + req.body.to
  const toFrom = req.body.to + req.body.from
  
  const { user } = req.params;
  console.log(user);

  try {
    const messages = await Messages.aggregate([
      {
        $match: {
          $or: [
            { from: new mongoose.Types.ObjectId(user) },
            { to: new mongoose.Types.ObjectId(user) },
            // {
            //   $and: [
            //     { from: new mongoose.Types.ObjectId(user) },
            //     { to: new mongoose.Types.ObjectId(user) },
            //   ],
            // },
            // {
            //   $and: [
            //     { from: new mongoose.Types.ObjectId(user) },
            //     { to: new mongoose.Types.ObjectId(user) },
            //   ],
            // },
          ],
        },
      },
    ]);

    console.log(messages);

    res.status(200).json(messages);
  } catch (error) {
    console.log(error);
  }
};

export const postMessage = async (req, res) => {
  const message = req.body;
  const newMessage = new Messages(message);

  try {
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
