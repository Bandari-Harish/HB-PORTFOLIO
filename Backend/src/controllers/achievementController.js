import { getAll, getOne, createOne, updateOne, deleteOne } from "./crudController.js";
import Achievement from "../models/Achievement.js";

export const getAchievements = getAll(Achievement);
export const getAchievement = getOne(Achievement);
export const createAchievement = createOne(Achievement);
export const updateAchievement = updateOne(Achievement);
export const deleteAchievement = deleteOne(Achievement);
