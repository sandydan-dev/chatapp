import { User } from "../model/userModel.js";
import { Message } from "../model/messageModel.js";
import { Op } from "sequelize";
import express from "express";
const router = express.Router();

router.post("/send-message", async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;
    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });
    res.status(200).json({ message: "Message sent successfully", newMessage });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Error sending message" });
  }
});

router.get("/:sender/:receiver", async (req, res) => {
  const { sender, receiver } = req.params;

  try {
    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { senderId: sender, receiverId: receiver },
          { senderId: receiver, receiverId: sender },
        ],
      },
      order: [["createdAt", "ASC"]],
    });

    res.status(200).json({ conversation: messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Error fetching messages" });
  }
});

export default router;
