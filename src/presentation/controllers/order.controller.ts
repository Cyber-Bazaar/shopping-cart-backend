import { Request, Response } from "express";
import { ProductService } from "../../application/product.service";
import { Injectable, Inject } from "../../presentation/utils/dIContainer";

@Injectable()
export class OrderController {
  constructor(
    @Inject("ProductService") private readonly productService: ProductService
  ) {}

  async getOrderHistory(req: Request, res: Response) {
    try {
      const products = await this.productService.getProducts();

      res.status(200).json({ message: "success", data: products });
    } catch (error) {
      console.error("Error while fetching products:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

}
