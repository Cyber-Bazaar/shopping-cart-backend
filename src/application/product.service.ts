import { Product } from "../domain/entity/product";
import { IProductRepository } from "../domain/i.product.repository";
import { Injectable, Inject } from "../presentation/utils/dIContainer";
@Injectable()
export class ProductService {
  constructor(
    @Inject("ProductRepository") private productRepository: IProductRepository
  ) {}

  async getProducts(): Promise<Product[] | null> {
    try {
      return await this.productRepository.getAllProducts();
    } catch (error) {
      console.error("Error while fetching products:", error);
      throw error;
    }
  }

  async getProduct(id: number): Promise<Product | null> {
    try {
      return await this.productRepository.getProductById(id);
    } catch (error) {
      console.error("Error while fetching product details:", error);
      throw error;
    }
  }
  async getProductsByCategoryId(categoryId: string): Promise<Product[] | null> {
    try {
      return await this.productRepository.getProductsByCategoryId(Number(categoryId));
    } catch (error: any) {
      console.error("Error while fetching items by category:", error.message);
      throw error;
    }
  }
  async getDetailsForCart(productIds: number[]): Promise<Product[] | null> {
    try {
      return await this.productRepository.getDetailsForCart(productIds);
    } catch (error: any) {
      console.error("Error while fetching items by category:", error.message);
      throw error;
    }
  }
}
