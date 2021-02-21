import dotenv from "dotenv";
import express from "express";
import https from "https";
import fs from "fs";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import eventRoutes from "./routes/events.js";
import propertyRoutes from "./routes/properties.js";
import userRoutes from "./routes/users.js";

const key = fs.readFileSync("./certs/selfsigned.key");
const cert = fs.readFileSync("./certs/selfsigned.crt");
const options = {
  key: key,
  cert: cert,
};

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/auth", authRoutes)
app.use("/events", eventRoutes);
app.use("/properties", propertyRoutes);
app.use("/users", userRoutes);

const CONNECTION_URL = `mongodb+srv://Bruno:${process.env.MONGODB_PASSWORD}@cluster0.2gkzu.mongodb.net/<dbname>?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 5000;

// const server = https.createServer(options, app);

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    autoIndex: true,
  })
  .then(() =>
    app.listen(
      PORT,
      () => console.log(`Server Running on Port: http://localhost:${PORT}`)
      // console.log("server starting on port : " + PORT)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set("useFindAndModify", false);
