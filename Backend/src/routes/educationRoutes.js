import express from "express";
import {
  getEducations,
  getEducation,
  createEducation,
  updateEducation,
  deleteEducation,
} from "../controllers/educationController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getEducations);
router.get("/:id", getEducation);
router.post("/", verifyToken, createEducation);
router.put("/:id", verifyToken, updateEducation);
router.delete("/:id", verifyToken, deleteEducation);

export default router;
