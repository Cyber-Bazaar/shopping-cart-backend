import { Product } from "./entity/product";

export interface IProductRepository {
  getAllProducts(page:number): Promise<Product[] | null>;

  getProductById(id: number): Promise<Product | null>;
  
  getProductsByCategoryId(id: number): Promise<Product[] | null>;

  getDetailsForCart(ids: number[]): Promise<Product[] | null>;
}
