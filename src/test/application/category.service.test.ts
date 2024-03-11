import { CategoryService } from "../../application/category.service";
import { Category } from "../../domain/entity/category";
import { ICategoryRepository } from "../../domain/i.category.repository";

describe("CategoryService", () => {
  let service: CategoryService;
  let mockCategoryRepository: Partial<ICategoryRepository>;

  beforeEach(() => {
    mockCategoryRepository = {
      getCategoryList: jest.fn(),
    };
    service = new CategoryService(
      mockCategoryRepository as ICategoryRepository
    );
  });

  describe("getCategorys", () => {
    it("should return all Categorys", async () => {
      const mockCategorys: Category[] = [
        {
          id: 1,
          name: "Test Category",
          description: "Test Category description",
          products: [],
        },
        {
          id: 2,
          name: "Test Category2",
          description: "Test Category2 description",
          products: [],
        },
      ];
      (mockCategoryRepository.getCategoryList as jest.Mock).mockResolvedValue(
        mockCategorys
      );

      const Categorys = await service.getCategoryList();

      expect(Categorys).toEqual(mockCategorys);

      //just matching only mockCategoryRepository.getCategoryList() function is calling not matching the return value
      expect(mockCategoryRepository.getCategoryList).toHaveBeenCalled();
    });

    it("should throw an error if something goes wrong", async () => {
      const error = new Error("Something went wrong");
      (mockCategoryRepository.getCategoryList as jest.Mock).mockRejectedValue(
        error
      );

      await expect(service.getCategoryList()).rejects.toThrow(error);
      expect(mockCategoryRepository.getCategoryList).toHaveBeenCalled();
    });
  });
});
