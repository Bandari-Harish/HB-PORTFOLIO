import { model, Schema } from "mongoose";

const achievementSchema = new Schema(
  {
    icon: {
      type: String,
      trim: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Achievement = model("Achievement", achievementSchema);
export default Achievement;
