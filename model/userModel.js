import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

// Define the User model

const User = sequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true, // Enable timestamps (createdAt and updatedAt)
    tableName: "users", // Specify the table name if different from the model name}
  }
);

export { User };