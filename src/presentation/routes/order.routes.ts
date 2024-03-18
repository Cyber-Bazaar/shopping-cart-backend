import { Router } from "express";
import { OrderController } from "../controllers/order.controller";
import { ProductService } from "../../application/product.service";
import { ProductRepository } from "../../infrastructure/type-ORM/product.repository";
import { DIContainer } from "../utils/dIContainer";
import { ValidationMiddleware } from "../middlewares/validator";
import { ProductIds } from "../dto/dto";
const container = DIContainer.getInstance();

//Register services
container.register("ProductRepository", ProductRepository);
container.register("ProductService", ProductService);
container.register("OrdertController", OrderController);

const router = Router();
// Resolve services
try {
  const orderController =
    container.resolve<OrderController>("OrderController");
  router
    .route("/")
    .get((req, res) => orderController.getOrderHistory(req, res));

} catch (error) {
  console.error("Error resolving Controller:", error);
}
export default router;
