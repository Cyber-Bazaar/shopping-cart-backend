import { Category } from "../domain/entity/category";
import { ICategoryRepository } from "../domain/i.category.repository";
import { Injectable, Inject } from "../presentation/utils/dIContainer";
@Injectable()
export class CategoryService {
  constructor(
    @Inject("CategoryRepository")
    private CategoryRepository: ICategoryRepository
  ) {}

  async getCategoryList(): Promise<Category[] | null> {
    try {
      return await this.CategoryRepository.getCategoryList();
    } catch (error: any) {
      console.error("Error while fetching category list:", error.message);
      throw error;
    }
  }
}
