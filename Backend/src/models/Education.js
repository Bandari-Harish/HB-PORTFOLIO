import { model, Schema } from "mongoose";

const educationSchema = new Schema(
  {
    degree: {
      type: String,
      required: true,
      trim: true,
    },
    field: {
      type: String,
      trim: true,
    },
    institution: {
      type: String,
      required: true,
      trim: true,
    },
    period: {
      type: String,
      trim: true,
    },
    grade: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Education = model("Education", educationSchema);
export default Education;
