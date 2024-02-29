import { Router } from "express";
import { ProductController } from "../controllers/product.controller";
import { ProductService } from "../../application/product.service";
import { ProductRepository } from "../../infrastructure/type-ORM/product.repository";
import { DIContainer } from "../utils/dIContainer";

const container = new DIContainer();

//Register services
container.register("ProductRepository", ProductRepository);
container.register("ProductService", ProductService);
container.register("ProductController", ProductController);

const router = Router();
// Resolve services
try {
  const productController =
    container.resolve<ProductController>("ProductController");
  router
    .route("/get-products")
    .get(productController.getProduct.bind(productController));

  router
    .route("/get-product/:id")
    .get(productController.getProductById.bind(productController));
} catch (error) {
  console.error("Error resolving Controller:", error);
}
export default router;
