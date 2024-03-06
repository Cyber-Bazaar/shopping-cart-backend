import { IProductRepository } from "../../domain/i.product.repository";
import { Product } from "../../domain/entity/product";
import { DataSource } from "typeorm";
import { AppDataSource } from "../../config/data.source";

export class ProductRepository implements IProductRepository {
  private readonly db: DataSource;

  constructor() {
    this.db = AppDataSource;
  }

  async getAllProducts(): Promise<Product[] | null> {
    return await this.db.getRepository(Product).find();
  }
}
