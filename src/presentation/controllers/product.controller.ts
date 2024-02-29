import { Request, Response } from "express";
import { ProductService } from "../../application/product.service";
import { Injectable, Inject } from "../../presentation/utils/dIContainer";

@Injectable()
export class ProductController {
  constructor(
    @Inject("ProductService") private readonly productService: ProductService
  ) {}

  async getProduct(req: Request, res: Response) {
    try {
      const user = await this.productService.getProduct();

      res.status(200).json({ message: "success", data: user });
    } catch (error) {
      console.error("Error while fetching user:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
