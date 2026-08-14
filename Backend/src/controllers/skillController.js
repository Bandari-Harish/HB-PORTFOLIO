import { getAll, getOne, createOne, updateOne, deleteOne } from "./crudController.js";
import Skill from "../models/Skill.js";

export const getSkills = getAll(Skill);
export const getSkill = getOne(Skill);
export const createSkill = createOne(Skill);
export const updateSkill = updateOne(Skill);
export const deleteSkill = deleteOne(Skill);
