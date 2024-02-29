import { Request, Response } from "express";
import { ProductService } from "../../application/product.service";
import { ProductController } from "../../presentation/controllers/product.controller";
import { IProductRepository } from "../../domain/i.product.repository";

jest.mock("../../application/product.service");

describe("ProductController", () => {
  let productService: ProductService;
  let productController: ProductController;
  let mockProductRepository: jest.Mocked<IProductRepository>; // Create a mock repository

  beforeEach(() => {
    mockProductRepository = {} as jest.Mocked<IProductRepository>;

    productService = new ProductService(mockProductRepository);
    productController = new ProductController(productService);
  });

  it("should return product", async () => {
    // Arrange
    const expectedProduct = [
      {
        id: 1,
        name: "Test Product",
        quantity: 10,
        price: 100,
        image: "test-image.jpg",
      },
    ]; // Make this an array
    const mockRequest = {} as Request;
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    jest.spyOn(productService, "getProduct").mockResolvedValue(expectedProduct);

    // Act
    await productController.getProduct(mockRequest, mockResponse);

    // Assert
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "success",
      data: expectedProduct,
    });
  });

  it("should return 500 on error", async () => {
    // Arrange
    const mockRequest = {} as Request;
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    jest
      .spyOn(productService, "getProduct")
      .mockRejectedValue(new Error("Test error"));

    // Act
    await productController.getProduct(mockRequest, mockResponse);

    // Assert
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Internal server error",
    });
  });
});
