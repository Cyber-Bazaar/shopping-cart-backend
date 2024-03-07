import "reflect-metadata";
import { DataSource } from "typeorm";
import { Product } from "../domain/entity/product";
import { Category } from "../domain/entity/category";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "shopping-cart",
  synchronize: true,
  logging: false,
  entities: [Product,Category],
  migrations: [],
  subscribers: [],
});
