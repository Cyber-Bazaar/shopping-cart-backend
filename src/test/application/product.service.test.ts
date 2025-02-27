import { ProductService } from "../../application/product.service";
import { Category } from "../../domain/entity/category";
import { Product } from "../../domain/entity/product";
import { OrderToProduct } from "../../domain/entity/orderToProduct";
import { IProductRepository } from "../../domain/i.product.repository";

describe("ProductService", () => {
  let service: ProductService;
  let mockProductRepository: Partial<IProductRepository>;

  beforeEach(() => {
    mockProductRepository = {
      getAllProducts: jest.fn(),
      getProductById: jest.fn(),
      getProductsByCategoryId: jest.fn(),
      getDetailsForCart: jest.fn(),
    };
    service = new ProductService(mockProductRepository as IProductRepository);
  });

  describe("getProducts", () => {
    it("should return all products", async () => {
      const mockCategory1: Category = {
        id: 1,
        name: "Test Category",
        description: "Test Description",
        products: [],
      };
      const mockCategory2: Category = {
        id: 2,
        name: "Test Category2",
        description: "Test Description2",
        products: [],
      };
      const mockOrderToProduct : OrderToProduct[] = []
      const mockProducts: Product[] = [
        {
          id: 1,
          name: "Test Product",
          quantity: 10,
          price: 100,
          image: "test-image.jpg",
          category: mockCategory1,
          orderToProduct:mockOrderToProduct,
        },
        {
          id: 2,
          name: "Test Product2",
          quantity: 102,
          price: 1002,
          image: "test-image2.jpg",
          category: mockCategory2,
          orderToProduct:mockOrderToProduct,
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
      const mockCategory1: Category = {
        id: 1,
        name: "Test Category",
        description: "Test Description",
        products: [],
      };
      const mopckOrderToProduct : OrderToProduct[] = []

      const mockProduct: Product = {
        id: 1,
        name: "Test Product",
        quantity: 10,
        price: 100,
        image: "test-image.jpg",
        category: mockCategory1,
        orderToProduct:mopckOrderToProduct,
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

  describe("getProductsByCategoryId", () => {
    it("should return products for the given category id", async () => {
      const mockProducts = [{ id: "1", name: "Product 1" }, { id: "2", name: "Product 2" }];
      (mockProductRepository.getProductsByCategoryId as jest.Mock).mockResolvedValue(mockProducts);
  
      const result = await service.getProductsByCategoryId("1");
  
      expect(result).toEqual(mockProducts);
      expect(mockProductRepository.getProductsByCategoryId).toHaveBeenCalledWith(1);
    });
  
    it("should throw an error if there is an issue fetching products", async () => {
      const error = new Error("Error while fetching items by category");
      (mockProductRepository.getProductsByCategoryId as jest.Mock).mockRejectedValue(error);
  
      await expect(service.getProductsByCategoryId("1")).rejects.toThrow(error);
      expect(mockProductRepository.getProductsByCategoryId).toHaveBeenCalledWith(1);
    });
  });

  describe('getDetailsForCart', () => {
    it('should return products for the given product ids', async () => {
      const mockProducts = [{
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
      }];
      (mockProductRepository.getDetailsForCart as jest.Mock).mockResolvedValue(mockProducts);
  
      const result = await service.getDetailsForCart([1, 2]);
  
      expect(result).toEqual(mockProducts);
      expect(mockProductRepository.getDetailsForCart).toHaveBeenCalledWith([1, 2]);
    });
  
    it('should throw an error if there is an issue fetching products', async () => {
      const error = new Error('Error while fetching items by category');
      (mockProductRepository.getDetailsForCart as jest.Mock).mockRejectedValue(error);
  
      await expect(service.getDetailsForCart([1, 2])).rejects.toThrow(error);
      expect(mockProductRepository.getDetailsForCart).toHaveBeenCalledWith([1, 2]);
    });
  });
});
