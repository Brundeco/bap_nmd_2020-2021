import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  messages: [
    {
      message: String,
      meta: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
          delivered: Boolean,
          read: Boolean,
        },
      ],
    },
  ],
});

const Messages = mongoose.model("Message", messageSchema);

export default Messages;
