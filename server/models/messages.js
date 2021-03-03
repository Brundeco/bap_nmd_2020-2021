import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
  {
    message: { type: String, required: true },
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fromName: { type: String, required: true },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    toName: { type: String, required: true },
    conversationId: { type: String, required: true },
    conversationNameStr: { type: String, required: true },
    read: { type: Date },
  },
  { timestamps: true }
);

const Messages = mongoose.model("Message", messageSchema);

export default Messages;
