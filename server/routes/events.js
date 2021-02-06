import express from "express";

import { getEvents, createEvent, getEvent } from "../controllers/events.js";

const router = express.Router();

router.get("/", getEvents);
router.get('/:id', getEvent);
router.post("/", createEvent);

export default router;