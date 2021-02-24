import express from "express";

import { getMessages, postMessage } from "../controllers/chat.js";

const router = express.Router();

router.get("/:user", getMessages);
router.post("/", postMessage);

export default router;