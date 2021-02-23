import mongoose from "mongoose";

const chatSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  image: String
}, {
  timestamps: true,
});

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;
