import { getAll, getOne, updateOne, deleteOne } from "./crudController.js";
import Message from "../models/Message.js";

export const getMessages = getAll(Message);
export const getMessage = getOne(Message);
export const updateMessage = updateOne(Message);
export const deleteMessage = deleteOne(Message);

export const sendMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ success: false, message: "Name, email and message are required" });
    }

    const msg = await Message.create({ name, email, subject, message });
    return res
      .status(201)
      .json({ success: true, message: "Message sent", item: msg });
  } catch (error) {
    console.error("Send message error:", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
