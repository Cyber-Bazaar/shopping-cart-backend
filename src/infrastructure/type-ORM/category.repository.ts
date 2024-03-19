import { ICategoryRepository } from "../../domain/i.category.repository";
import { Category } from "../../domain/entity/category";
import { DataSource } from "typeorm";
import { AppDataSource } from "../../config/data.source";

export class CategoryRepository implements ICategoryRepository {
  private readonly db: DataSource;

  constructor() {
    this.db = AppDataSource;
  }

  async getCategoryList(): Promise<Category[] | null> {
    return await this.db.getRepository(Category).find();
  }
}
