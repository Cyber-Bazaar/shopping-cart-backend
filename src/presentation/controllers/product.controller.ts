import { Request, Response } from "express";
import { ProductService } from "../../application/product.service";
import { Injectable, Inject } from "../../presentation/utils/dIContainer";

@Injectable()
export class ProductController {
  constructor(
    @Inject("ProductService") private readonly productService: ProductService
  ) {}

  async getProducts(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string)||1;
      const products = await this.productService.getProducts(page);
      res.status(200).json({ message: "success", data: products });
    } catch (error) {
      console.error("Error while fetching products:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getProduct(req: Request, res: Response) {
    const id = +req.params.id;
    
    if (!id) {
      return res.status(400).json({ message: "Invalid product id" });
    }

    try {
      const product = await this.productService.getProduct(id);
      if (!product) {
        return res.status(404).json({ message: "product doesn't found" });
      }
      res.status(200).json({ message: "success", data: product });
    } catch (error) {
      console.error("Error while fetching product:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  
  async getProductsByCategoryId(req: Request, res: Response) {
    try {
      const categoryId = req.params.id;
      const products = await this.productService.getProductsByCategoryId(categoryId);
      if (!products || products.length === 0) {
        return res.status(404).json({ message: "There isn't any products under this category" });
      }
      res.status(200).json({ message: "success", data: products });
    } catch (error) {
      console.error("Error while fetching items by category:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getDetailsForCart(req: Request, res: Response) {
    try {
      const productIds = req.body.productIds;
      const products = await this.productService.getDetailsForCart(productIds);
      if (!products || products.length === 0) {
        return res.status(404).json({ message: "Invalid product IDs" });
      }
      res.status(200).json({ message: "success", data: products });
    } catch (error) {
      console.error("Error while fetching items by category:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
