import Messages from "../models/messages.js";
import Users from "../models/users.js";




export const getMessages = async (req, res) => {
  const { user } = req.params;

  try {
    const messages = await Messages.find({ recepient: user }).exec();
    console.log(messages)

    const dbUser = await Users.find({ _id: user }).exec();
    console.log(dbUser)

  } catch (error) {
    console.log(error)
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
