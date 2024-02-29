import express from "express";
import "reflect-metadata";
import { AppDataSource } from "../config/data.source";
import productRouter from "./routes/product.routes";
let cors = require("cors");
const app = express();
const port = 5000;
app.use(cors());
// Routes
app.use("/api/product", productRouter);

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
