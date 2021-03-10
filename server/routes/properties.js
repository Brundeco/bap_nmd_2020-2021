import express from "express";

import { getProperties, createProperty, getProperty, updateProperty, getPropertiesAdmin } from "../controllers/properties.js";

const router = express.Router();

router.get("/", getProperties);
router.post("/admin", getPropertiesAdmin);
router.get('/:id', getProperty);
router.post("/", createProperty);
router.put("/:id", updateProperty);

export default router;