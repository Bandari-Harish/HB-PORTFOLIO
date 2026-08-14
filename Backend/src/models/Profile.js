import { model, Schema } from "mongoose";

const profileSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    roles: {
      type: [String],
      default: [],
    },
    tagline: {
      type: String,
      trim: true,
    },
    about: {
      type: String,
      trim: true,
    },
    objective: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    education: {
      type: String,
      trim: true,
    },
    languages: {
      type: [String],
      default: [],
    },
    experience: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    social: {
      linkedin: { type: String, trim: true },
      github: { type: String, trim: true },
    },
    availability: {
      type: String,
      trim: true,
    },
    avatar: {
      type: String,
      trim: true,
    },
    resume: {
      type: String,
      trim: true,
    },
    stats: {
      projects: { type: Number, default: 0 },
      technologies: { type: Number, default: 0 },
      githubRepos: { type: Number, default: 0 },
      codingHours: { type: Number, default: 0 },
    },
  },
  {
    timestamps: true,
  }
);

const Profile = model("Profile", profileSchema);
export default Profile;
