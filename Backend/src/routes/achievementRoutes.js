import express from "express";
import {
  getAchievements,
  getAchievement,
  createAchievement,
  updateAchievement,
  deleteAchievement,
} from "../controllers/achievementController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAchievements);
router.get("/:id", getAchievement);
router.post("/", verifyToken, createAchievement);
router.put("/:id", verifyToken, updateAchievement);
router.delete("/:id", verifyToken, deleteAchievement);

export default router;
