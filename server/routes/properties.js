import express from "express";

import { getProperties, createProperty, getProperty } from "../controllers/properties.js";

const router = express.Router();

router.get("/", getProperties);
router.get('/:id', getProperty);
router.post("/", createProperty);

export default router;