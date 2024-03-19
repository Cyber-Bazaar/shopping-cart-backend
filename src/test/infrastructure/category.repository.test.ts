import { CategoryRepository } from "../../infrastructure/type-ORM/category.repository";
import { Category } from "../../domain/entity/category";

describe("CategoryRepository", () => {
  let repository: CategoryRepository;

  beforeEach(() => {
    repository = new CategoryRepository();
  });

  describe("getAllCategorys", () => {
    it("should return all Categorys", async () => {
      const mockCategorys: Category[] = [
        {
          id: 1,
          name: "Category 1",
          description: "Category 1 description",
        },
        {
          id: 2,
          name: "Category 2",
          description: "Category 2 description",
        },
      ];
      jest
        .spyOn(repository, "getCategoryList")
        .mockResolvedValue(mockCategorys);

      const Categorys = await repository.getCategoryList();

      expect(Categorys).toEqual(mockCategorys);
    });

    it("should throw an error if something goes wrong", async () => {
      const error = new Error("Something went wrong");
      jest.spyOn(repository, "getCategoryList").mockRejectedValue(error);

      await expect(repository.getCategoryList()).rejects.toThrow(error);
    });
  });
});
