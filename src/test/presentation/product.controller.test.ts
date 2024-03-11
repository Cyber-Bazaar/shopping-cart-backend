import { ProductController } from "../../presentation/controllers/product.controller";
import { ProductService } from "../../application/product.service";
import { Request, Response } from "express";

describe("ProductController", () => {
  let mockProductService: Partial<ProductService>;
  let controller: ProductController;

  beforeEach(() => {
    mockProductService = {
      getProducts: jest.fn(),
      getProduct: jest.fn(),
      getProductsByCategoryId: jest.fn(),
    };
    controller = new ProductController(mockProductService as ProductService);
  });

  describe("getProducts", () => {
    it("should return all products", async () => {
      const mockProducts = [
        {
          id: 1,
          name: "Product 1",
          quantity: 5,
          price: 100,
          image: "kjsdflkadsgb.jpg",
        },
        {
          id: 2,
          name: "Product 2",
          quantity: 10,
          price: 200,
          image: "sadjsdflkadsgb.jpg",
        },
      ];
      //when the getProducts method is called, it should return the mockProducts
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

  describe("getProduct", () => {
    it("should return a product by id", async () => {
      const mockProduct = {
        id: 1,
        name: "Product 1",
        quantity: 5,
        price: 100,
        image: "kjsdflkadsgb.jpg",
      };
      //when the getproduct method is called, it should return the mockProduct
      (mockProductService.getProduct as jest.Mock).mockResolvedValue(
        mockProduct
      );

      const mockReq: Partial<Request> = { params: { id: "1" } };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await controller.getProduct(mockReq as Request, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "success",
        data: mockProduct,
      });
    });

    it("should return 404 if product is not found", async () => {
      const mockReq: Partial<Request> = { params: { id: "1" } };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      //when the getproduct method is called, it should return null
      (mockProductService.getProduct as jest.Mock).mockResolvedValue(null);

      await controller.getProduct(mockReq as Request, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "product doesn't found",
      });
    });

    it("should return 400 if id is not provided", async () => {
      const mockReq = { params: {} } as Request;
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await controller.getProduct(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Invalid product id",
      });
    });

    it("should return 500 if something goes wrong", async () => {
      const error = new Error("Something went wrong");
      (mockProductService.getProduct as jest.Mock).mockRejectedValue(error);

      const mockReq: Partial<Request> = { params: { id: "1" } };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await controller.getProduct(mockReq as Request, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Internal server error",
      });
    });
  });

  describe("getProductsByCategoryId", () => {
    it("should return 200 and the products if products found for the category", async () => {
      const mockReq: Partial<Request> = { params: { category: "1" } };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const mockProducts = [
        {
          id: 1,
          name: "Product 1",
          quantity: 5,
          price: 100,
          image: "kjsdflkadsgb.jpg",
          category: "1",
        },
        {
          id: 2,
          name: "Product 2",
          quantity: 10,
          price: 1000,
          image: "kjsdflkadsgbgfh.jpg",
          category: "1",
        },
      ];
      (
        mockProductService.getProductsByCategoryId as jest.Mock
      ).mockResolvedValue(mockProducts);

      await controller.getProductsByCategoryId(mockReq as Request, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "success",
        data: mockProducts,
      });
    });

    it("should return 404 if no products found for the category", async () => {
      const mockReq: Partial<Request> = { params: { id: "1" } };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      (
        mockProductService.getProductsByCategoryId as jest.Mock
      ).mockResolvedValue(null);

      await controller.getProductsByCategoryId(mockReq as Request, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "There isn't any products under this category",
      });
    });

    it("should return 500 if there is an internal server error", async () => {
      const mockReq: Partial<Request> = { params: { id: "1" } };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      (
        mockProductService.getProductsByCategoryId as jest.Mock
      ).mockRejectedValue(new Error());

      await controller.getProductsByCategoryId(mockReq as Request, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Internal server error",
      });
    });
  });
});
