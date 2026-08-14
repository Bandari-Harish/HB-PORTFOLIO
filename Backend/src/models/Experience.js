import { model, Schema } from "mongoose";

const experienceSchema = new Schema(
  {
    role: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    period: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      enum: ["fulltime", "internship", "contract", "freelance"],
      default: "fulltime",
    },
    points: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Experience = model("Experience", experienceSchema);
export default Experience;
