import { Request, Response } from "express";
import { CategoryService } from "../../application/category.service";
import { Injectable, Inject } from "../../presentation/utils/dIContainer";

@Injectable()
export class CategoryController {
  constructor(
    @Inject("CategoryService") private readonly CategoryService: CategoryService
  ) {}

  async getCategoryList(req: Request, res: Response) {
    try {
      const categoryList = await this.CategoryService.getCategoryList();
      res.status(200).json({ message: "success", data: categoryList });
    } catch (error) {
      console.error("Error while fetching category list:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
