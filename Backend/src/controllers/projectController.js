import { getAll, getOne, createOne, updateOne, deleteOne } from "./crudController.js";
import Project from "../models/Project.js";

export const getProjects = getAll(Project);
export const getProject = getOne(Project);
export const createProject = createOne(Project);
export const updateProject = updateOne(Project);
export const deleteProject = deleteOne(Project);
