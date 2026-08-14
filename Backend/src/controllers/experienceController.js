import { getAll, getOne, createOne, updateOne, deleteOne } from "./crudController.js";
import Experience from "../models/Experience.js";

export const getExperiences = getAll(Experience);
export const getExperience = getOne(Experience);
export const createExperience = createOne(Experience);
export const updateExperience = updateOne(Experience);
export const deleteExperience = deleteOne(Experience);
