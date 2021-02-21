import express from "express";

import { auth } from "../auth/auth.js";

const router = express.Router();

router.post("/", auth);
export default router;