import Chat from "../models/chat.js";
import mongoose from "mongoose";

export const getChats = async (req, res) => {
  res.send('Chat get request triggered')

};