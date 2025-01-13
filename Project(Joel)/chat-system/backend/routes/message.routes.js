import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/:id", protectRoute, getMessages);          //protectRoute ensures that only authenticated users can access this route

router.post("/send/:id", protectRoute, sendMessage);

export default router;