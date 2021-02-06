import express from "express";

import { getEvents, createEvent, getEvent, updateEvent } from "../controllers/events.js";

const router = express.Router();

router.get("/", getEvents);
router.get('/:id', getEvent);
router.post("/", createEvent);
router.patch("/:id", updateEvent);

export default router;