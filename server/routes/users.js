import express from "express";

import { register, login, likeEvent, getUser } from "../controllers/users.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/:id", getUser);
router.put("/like/:id", likeEvent);

export default router;