import { model, Schema } from "mongoose";

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
    },
    icon: {
      type: String,
      trim: true,
    },
    period: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    tech: {
      type: [String],
      default: [],
    },
    github: {
      type: String,
      trim: true,
    },
    demo: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["published", "draft"],
      default: "published",
    },
  },
  {
    timestamps: true,
  }
);

const Project = model("Project", projectSchema);
export default Project;
