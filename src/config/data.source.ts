import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Product } from "../domain/entity/product";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: Boolean(process.env.DB_SYNCHRONIZE),
  logging: false,
  entities: [Product],
  migrations: [],
  subscribers: [],
});
