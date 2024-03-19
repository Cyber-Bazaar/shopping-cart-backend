import { ProductService } from "../../application/product.service";
import { Product } from "../../domain/entity/product";
import { IProductRepository } from "../../domain/i.product.repository";

describe("ProductService", () => {
  let service: ProductService;
  let mockProductRepository: Partial<IProductRepository>;

  beforeEach(() => {
    mockProductRepository = {
      getAllProducts: jest.fn(),
      getProductById: jest.fn(),
    };
    service = new ProductService(mockProductRepository as IProductRepository);
  });

  describe("getProducts", () => {
    it("should return all products", async () => {
      const mockProducts: Product[] = [
        {
          id: 1,
          name: "Test Product",
          quantity: 10,
          price: 100,
          image: "test-image.jpg",
        },
        {
          id: 2,
          name: "Test Product2",
          quantity: 102,
          price: 1002,
          image: "test-image2.jpg",
        },
      ];
      (mockProductRepository.getAllProducts as jest.Mock).mockResolvedValue(
        mockProducts
      );

      const products = await service.getProducts();

      expect(products).toEqual(mockProducts);
      expect(mockProductRepository.getAllProducts).toHaveBeenCalled();
    });

    it("should throw an error if something goes wrong", async () => {
      const error = new Error("Something went wrong");
      (mockProductRepository.getAllProducts as jest.Mock).mockRejectedValue(
        error
      );

      await expect(service.getProducts()).rejects.toThrow(error);
      expect(mockProductRepository.getAllProducts).toHaveBeenCalled();
    });
  });
  describe("getProduct", () => {
    it("should return a product by id", async () => {
      const mockProduct: Product = {
        id: 1,
        name: "Test Product",
        quantity: 10,
        price: 100,
        image: "test-image.jpg",
      };
      (mockProductRepository.getProductById as jest.Mock).mockResolvedValue(
        mockProduct
      );

      const product = await service.getProduct(1);

      expect(product).toEqual(mockProduct);
      expect(mockProductRepository.getProductById).toHaveBeenCalledWith(1);
    });

    it("should throw an error if something goes wrong", async () => {
      const error = new Error("Something went wrong");
      (mockProductRepository.getProductById as jest.Mock).mockRejectedValue(
        error
      );

      await expect(service.getProduct(1)).rejects.toThrow(error);
      expect(mockProductRepository.getProductById).toHaveBeenCalledWith(1);
    });
  });
});
