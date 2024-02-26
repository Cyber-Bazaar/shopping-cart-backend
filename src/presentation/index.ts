import express from "express";
import "reflect-metadata";
import { AppDataSource } from "../config/data.source";

const app = express();
const port = 5000;

// Middleware
app.use(express.json());

const startServer = async (port: number) => {
  try {
    await AppDataSource.initialize();
    console.log("Connected to database successfully");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1);
  }
};

startServer(port);
