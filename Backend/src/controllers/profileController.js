import Profile from "../models/Profile.js";

export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne().sort({ createdAt: -1 });
    if (!profile) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }
    return res.status(200).json({ success: true, profile });
  } catch (error) {
    console.error("Get profile error:", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const createProfile = async (req, res) => {
  try {
    const existing = await Profile.findOne();
    if (existing) {
      return res
        .status(400)
        .json({ success: false, message: "Profile already exists" });
    }

    const profile = await Profile.create(req.body);
    return res.status(201).json({ success: true, profile });
  } catch (error) {
    console.error("Create profile error:", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }

    const updated = await Profile.findByIdAndUpdate(profile._id, req.body, {
      returnDocument: "after",
      runValidators: true,
    });
    return res.status(200).json({ success: true, profile: updated });
  } catch (error) {
    console.error("Update profile error:", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }

    await Profile.findByIdAndDelete(profile._id);
    return res.status(200).json({ success: true, message: "Profile deleted" });
  } catch (error) {
    console.error("Delete profile error:", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
