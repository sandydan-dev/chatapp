import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

// basic sequelize connection
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./chatapp.sqlite",
});

// test connection to database
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    sequelize.sync({ force: false });
    console.log("Database & tables created!");
    // Sync the database (create tables if they don't exist)
    console.log(
      "Connection to the database has been established successfully."
    );
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

export { sequelize, connectDB };
