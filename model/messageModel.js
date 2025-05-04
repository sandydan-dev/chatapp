import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

// Define the Message model
const Message = sequelize.define(
  "Message",
  {
    sender: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    receiver: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: true, // Enable timestamps (createdAt and updatedAt)
    tableName: "messages", // Specify the table name if different from the model name
  }
);
export { Message };
