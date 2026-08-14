import express from "express";
import {
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile,
} from "../controllers/profileController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getProfile);
router.post("/", verifyToken, createProfile);
router.put("/", verifyToken, updateProfile);
router.delete("/", verifyToken, deleteProfile);

export default router;
