import { Product } from "./entity/product";

export interface IProductRepository {
  getAllProducts(): Promise<Product[] | null>;

  // findByEmail(email: string): Promise<User | null>;
}
