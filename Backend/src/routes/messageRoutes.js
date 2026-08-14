import express from "express";
import {
  sendMessage,
  getMessages,
  getMessage,
  updateMessage,
  deleteMessage,
} from "../controllers/messageController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", sendMessage);
router.get("/", verifyToken, getMessages);
router.get("/:id", verifyToken, getMessage);
router.put("/:id", verifyToken, updateMessage);
router.delete("/:id", verifyToken, deleteMessage);

export default router;
