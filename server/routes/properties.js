import express from "express";

import { getProperties, createProperty, getProperty, updateProperty } from "../controllers/properties.js";

const router = express.Router();

router.get("/", getProperties);
router.get('/:id', getProperty);
router.post("/", createProperty);
router.put("/:id", updateProperty);

export default router;