import { Router } from "express";
import { ProductController } from "../controllers/product.controller";
import { ProductService } from "../../application/product.service";
import { ProductRepository } from "../../infrastructure/type-ORM/product.repository";
import { DIContainer } from "../utils/dIContainer";

const container = DIContainer.getInstance();
const container = DIContainer.getInstance();

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
    .get((req, res) => productController.getProducts(req, res));

  router
    .route("/get-product/:id")
    .get((req, res) => productController.getProduct(req, res));
  router
    .route("/category/:id")
    .get((req, res) => productController.getProductsByCategoryId(req, res));
} catch (error) {
  console.error("Error resolving Controller:", error);
}
export default router;
