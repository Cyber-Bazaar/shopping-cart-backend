import { IProductRepository } from "../../domain/i.product.repository";
import { Product } from "../../domain/entity/product";
import { DataSource, In } from "typeorm";
import { AppDataSource } from "../../config/data.source";

export class ProductRepository implements IProductRepository {
  private readonly db: DataSource;

  constructor() {
    this.db = AppDataSource;
  }

  async getAllProducts(page:number): Promise<any> {
    const builder = this.db.getRepository(Product).createQueryBuilder("products");
    const total = await builder.getCount();
    const limit =6;
    const last_page= Math.ceil(await builder.getCount()/limit);
    builder.offset((page - 1) * limit);
    builder.limit(limit);
    return ({data:await builder.getMany(), page,last_page,total});
  }

  async getProductById(id: number): Promise<Product | null> {
    return await this.db.getRepository(Product).findOne({ where: { id } });
  }

  async getProductsByCategoryId(categoryId: number): Promise<Product[] | null> {
    return await this.db
      .getRepository(Product)
      .find({ where: { category: { id: categoryId } } });
  }

  async getDetailsForCart(productIds: number[]): Promise<Product[] | null> {
    return await this.db.getRepository(Product).findBy({ id: In(productIds) });
  }
}
