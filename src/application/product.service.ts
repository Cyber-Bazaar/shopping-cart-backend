import { Product } from "../domain/entity/product";
import { IProductRepository } from "../domain/i.product.repository";
import { Injectable, Inject } from "../presentation/utils/dIContainer";
@Injectable()
export class ProductService {
  constructor(
    @Inject("ProductRepository") private productRepository: IProductRepository
  ) {
    console.log("USER SERVICE CREATED");
  }

  async getProducts(): Promise<Product[] | null> {
    try {
      return await this.productRepository.getAllProducts();
    } catch (error) {
      console.error("Error while fetching user:", error);
      throw error;
    }
  }
}
