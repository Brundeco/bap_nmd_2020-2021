import dotenv from "dotenv";
import express from "express";
import http from "http";
import * as io from "socket.io";

import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import eventRoutes from "./routes/events.js";
import propertyRoutes from "./routes/properties.js";
import userRoutes from "./routes/users.js";
import chatRoutes from "./routes/chat.js";

const app = express();
const server = http.createServer(app);
const socketio = new io.Server(server);

socketio.on("connection", (socket) => {
  console.log("New connection :)");

  socket.on("join", ({ author, author_id }) => {
    console.log(author, author_id);
  });

  socket.on("disconnect", () => {
    console.log("User left the chat :(");
  });
});

dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/auth", authRoutes);
app.use("/events", eventRoutes);
app.use("/properties", propertyRoutes);
app.use("/users", userRoutes);
app.use("/chat", chatRoutes);

const CONNECTION_URL = `mongodb+srv://Bruno:${process.env.MONGODB_PASSWORD}@cluster0.2gkzu.mongodb.net/<dbname>?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    autoIndex: true,
  })
  .then(() =>
    server.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set("useFindAndModify", false);