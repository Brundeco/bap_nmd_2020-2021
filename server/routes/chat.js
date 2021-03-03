import express from "express";

import { getMessages, postMessage } from "../controllers/chat.js";

const router = express.Router();

router.get("/:user", getMessages);
router.get("/filter/:user/:user_2", getMessages);
router.post("/", postMessage);

export default router;