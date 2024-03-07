import { Category } from "./entity/category";

export interface ICategoryRepository {
  getCategoryList(): Promise<Category[] | null>;
}