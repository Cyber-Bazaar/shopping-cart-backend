import { Product } from "./entity/product";

export interface IProductRepository {
  getAllProducts(): Promise<Product[] | null>;

  getProductById(id: number): Promise<Product | null>;
  
  getProductsByCategoryId(id: number): Promise<Product[] | null>;
}
