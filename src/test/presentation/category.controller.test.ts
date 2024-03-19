import { CategoryController } from "../../presentation/controllers/category.controller";
import { CategoryService } from "../../application/category.service";
import { Request, Response } from "express";

describe("ProductController", () => {
  let mockProductService: Partial<CategoryService>;
  let controller: CategoryController;

  beforeEach(() => {
    mockProductService = {
      getCategoryList: jest.fn(),
    };
    controller = new CategoryController(mockProductService as CategoryService);
  });

  describe("getCategoryList", () => {
    it("should return category list", async () => {
      const mockCategoryList = [
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
      //when the getCategoryList method is called, it should return the mockProducts
      (mockProductService.getCategoryList as jest.Mock).mockResolvedValue(
        mockCategoryList
      );

      const mockReq = {} as Request;
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await controller.getCategoryList(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "success",
        data: mockCategoryList,
      });
    });

    it("should return 500 if something goes wrong", async () => {
      const error = new Error("Something went wrong");
      (mockProductService.getCategoryList as jest.Mock).mockRejectedValue(
        error
      );

      const mockReq = {} as Request;
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await controller.getCategoryList(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Internal server error",
      });
    });
  });
});
