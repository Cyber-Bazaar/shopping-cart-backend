import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";
import { CategoryService } from "../../application/category.service";
import { CategoryRepository } from "../../infrastructure/type-ORM/category.repository";
import { DIContainer } from "../utils/dIContainer";

const container = DIContainer.getInstance();

//Register services
container.register("CategoryRepository", CategoryRepository);
container.register("CategoryService", CategoryService);
container.register("CategoryController", CategoryController);

const router = Router();
// Resolve services
try {
  const categoryController =
    container.resolve<CategoryController>("CategoryController");
  router
    .route("/category-list")
    .get((req, res) => categoryController.getCategoryList(req, res));
} catch (error) {
  console.error("Error resolving Controller:", error);
}
export default router;
