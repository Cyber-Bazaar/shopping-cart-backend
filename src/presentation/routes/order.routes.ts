import { Router } from "express";
import { OrderController } from "../controllers/order.controller";
import { OrderService } from "../../application/order.service";
import { OrderRepository } from "../../infrastructure/type-ORM/order.repository";
import { DIContainer } from "../utils/dIContainer";
const container = DIContainer.getInstance();

//Register services
container.register("OrderRepository", OrderRepository);
container.register("OrderService", OrderService);
container.register("OrderController", OrderController);

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