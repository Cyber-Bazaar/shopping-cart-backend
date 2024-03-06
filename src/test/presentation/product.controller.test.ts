import { ProductController } from "../../presentation/controllers/product.controller";
import { ProductService } from "../../application/product.service";
import { Request, Response } from "express";

describe("ProductController", () => {
  let mockProductService: Partial<ProductService>;
  let controller: ProductController;

  beforeEach(() => {
    mockProductService = {
      getProducts: jest.fn(),
    };
    controller = new ProductController(mockProductService as ProductService);
  });

  it("should return all products", async () => {
    const mockProducts = [
      { id: 1, name: "Product 1", price: 100 },
      { id: 2, name: "Product 2", price: 200 },
    ];
    (mockProductService.getProducts as jest.Mock).mockResolvedValue(
      mockProducts
    );

    const mockReq = {} as Request;
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await controller.getProducts(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "success",
      data: mockProducts,
    });
  });

  it("should return 500 if something goes wrong", async () => {
    const error = new Error("Something went wrong");
    (mockProductService.getProducts as jest.Mock).mockRejectedValue(error);

    const mockReq = {} as Request;
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await controller.getProducts(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Internal server error",
    });
  });
});
