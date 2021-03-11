import Messages from "../models/messages.js";
import mongoose from "mongoose";

export const getMessages = async (req, res) => {
  const fromTo = req.body.from + req.body.to;
  const toFrom = req.body.to + req.body.from;

  const { user } = req.params;
  console.log(user);

  try {
    const messages = await Messages.aggregate([
      {
        $match: {
          $or: [
            { from: new mongoose.Types.ObjectId(user) },
            { to: new mongoose.Types.ObjectId(user) },
          ],
        },
      },
    ]);

    res.status(200).json(messages);
  } catch (error) {
    console.log(error);
  }
};

export const postMessage = async (req, res) => {
  let message = new Messages();
  const fromTo = `${req.body.from}_${req.body.to}`;
  const toFrom = `${req.body.to}_${req.body.from}`;
  let newConversationId = fromTo;

  try {
    await Messages.findOne({
      conversationId: fromTo,
    })
      .then((res) =>
        res == null ? null : (newConversationId = res.conversationId)
      )
      .catch((err) => console.log(err));

    await Messages.findOne({
      conversationId: toFrom,
    })
      .then((res) =>
        res == null ? null : (newConversationId = res.conversationId)
      )
      .catch((err) => console.log(err));

    message = new Messages({
      conversationId: newConversationId,
      from: req.body.from,
      fromName: req.body.fromName,
      to: req.body.to,
      toName: req.body.toName,
      message: req.body.message,
      conversationNameStr: req.body.conversationNameStr,
    });
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error.message });
  }
};
