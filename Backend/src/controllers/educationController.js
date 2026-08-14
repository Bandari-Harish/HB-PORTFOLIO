import { getAll, getOne, createOne, updateOne, deleteOne } from "./crudController.js";
import Education from "../models/Education.js";

export const getEducations = getAll(Education);
export const getEducation = getOne(Education);
export const createEducation = createOne(Education);
export const updateEducation = updateOne(Education);
export const deleteEducation = deleteOne(Education);
