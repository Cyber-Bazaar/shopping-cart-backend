import "reflect-metadata";
import { DataSource } from "typeorm";
import { Product } from "../domain/entity/product";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "shopping-cart",
  synchronize: true,
  logging: false,
  entities: [Product],
  migrations: [],
  subscribers: [],
});
