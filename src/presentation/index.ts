import express from "express";
import dotenv from "dotenv";
import "reflect-metadata";
import swaggerUi from "swagger-ui-express";
import { AppDataSource } from "../config/data.source";
import productRouter from "./routes/product.routes";
import specs from "../config/swagger";
dotenv.config();

let cors = require("cors");
const app = express();
const port = Number(process.env.PORT) ?? 5000;
app.use(cors());

//SWAGGER documentation routes
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
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
