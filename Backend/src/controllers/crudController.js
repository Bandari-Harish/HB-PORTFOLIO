export const getAll = (Model) => async (req, res) => {
  try {
    const items = await Model.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, items });
  } catch (error) {
    console.error(`Get all ${Model.modelName} error:`, error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getOne = (Model) => async (req, res) => {
  try {
    const item = await Model.findById(req.params.id);
    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: `${Model.modelName} not found` });
    }
    return res.status(200).json({ success: true, item });
  } catch (error) {
    console.error(`Get ${Model.modelName} error:`, error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const createOne = (Model) => async (req, res) => {
  try {
    const item = await Model.create(req.body);
    return res.status(201).json({ success: true, item });
  } catch (error) {
    console.error(`Create ${Model.modelName} error:`, error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateOne = (Model) => async (req, res) => {
  try {
    const item = await Model.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
      runValidators: true,
    });
    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: `${Model.modelName} not found` });
    }
    return res.status(200).json({ success: true, item });
  } catch (error) {
    console.error(`Update ${Model.modelName} error:`, error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteOne = (Model) => async (req, res) => {
  try {
    const item = await Model.findByIdAndDelete(req.params.id);
    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: `${Model.modelName} not found` });
    }
    return res
      .status(200)
      .json({ success: true, message: `${Model.modelName} deleted` });
  } catch (error) {
    console.error(`Delete ${Model.modelName} error:`, error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
