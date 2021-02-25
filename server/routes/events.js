import express from "express";

import { getEvents, createEvent, getEvent, updateEvent } from "../controllers/events.js";
import { auth } from "./../auth/auth.js";

const router = express.Router();

router.get("/", getEvents);
router.get('/:id', getEvent);
router.post("/", createEvent);
router.put("/:id", updateEvent);

export default router;