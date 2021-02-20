import express from "express";

import { getEvents, createEvent, getEvent, updateEvent } from "../controllers/events.js";
import { auth } from "./../auth/auth.js";

const router = express.Router();

router.get("/", auth, getEvents);
router.get('/:id', auth, getEvent);
router.post("/", auth, createEvent);
router.patch("/:id", auth, updateEvent);

export default router;