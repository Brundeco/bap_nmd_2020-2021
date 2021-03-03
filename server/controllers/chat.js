import Messages from "../models/messages.js";
import mongoose from "mongoose";

export const getMessages = async (req, res) => {
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
      // { $unwind: "$fromName" },
      // { $group: { _id: "$conversationNameStr", totaldocs: { $sum: 1 } } },
      // { $project: { _id: 0, message: 1, fromName: 1, toName: 1 } },
      // { $sort: { toName: -1 } },
    ]);

    console.log(messages);

    res.status(200).json(messages);

    // const conversations = db.messages
    //   .aggregate([{ $group: { _id: "$name", totaldocs: { $sum: 1 } } }])
    //   .pretty();
    // console.log(messages);

    // const dbUser = await Users.find({ _id: user }).exec();
    // console.log(dbUser);
  } catch (error) {
    console.log(error);
  }

  // console.log(req.params)

  // Message.findOne({ recepient: sender }, function (err, message) {
  //   if (err) return handleError(err);
  //   // Prints "Space Ghost is a talk show host".
  //   console.log(message);
  // });
};

// export const getMessages = async (req, res) => {
//   const { user } = req.params;

//   try {
//     const messages = await Messages.find({ recepient: user }).exec();
//     console.log(messages)

//     const dbUser = await Users.find({ _id: user }).exec();
//     console.log(dbUser)

//   } catch (error) {
//     console.log(error)
//   }

//   // console.log(req.params)

//   // Message.findOne({ recepient: sender }, function (err, message) {
//   //   if (err) return handleError(err);
//   //   // Prints "Space Ghost is a talk show host".
//   //   console.log(message);
//   // });
// };

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

// export const getMessages = async (req, res) => {
//   const { user } = req.params;

//   try {
//     const messages = await Messages.find({
//       $or: [{ from: user.from }, { to: user.from }],
//     });
//     console.log(messages);
//   } catch (err) {
//     console.log(err);
//   }
// };
