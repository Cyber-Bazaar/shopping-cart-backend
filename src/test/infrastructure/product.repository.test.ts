import { ProductRepository } from "../../infrastructure/type-ORM/product.repository";
import { Product } from "../../domain/entity/product";
import { Category } from "../../domain/entity/category";
import { OrderToProduct } from "../../domain/entity/orderToProduct";

describe("ProductRepository", () => {
  let repository: ProductRepository;

  beforeEach(() => {
    repository = new ProductRepository();
  });

  describe("getAllProducts", () => {
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
          name: "Product 1",
          price: 100,
          quantity: 10,
          image: "image1.jpg",
          category: mockCategory1,
          orderToProduct: mockOrderToProduct,
        },
        {
          id: 2,
          name: "Product 2",
          price: 200,
          quantity: 20,
          image: "image2.jpg",
          category: mockCategory2,
          orderToProduct: mockOrderToProduct,
        },
      ];
      jest.spyOn(repository, "getAllProducts").mockResolvedValue(mockProducts);

      const products = await repository.getAllProducts();

      expect(products).toEqual(mockProducts);
    });

    it("should throw an error if something goes wrong", async () => {
      const error = new Error("Something went wrong");
      jest.spyOn(repository, "getAllProducts").mockRejectedValue(error);

      await expect(repository.getAllProducts()).rejects.toThrow(error);
    });
  });

  describe("getProductById", () => {
    it("should return a product by id", async () => {
      const mockCategory1: Category = {
        id: 1,
        name: "Test Category",
        description: "Test Description",
        products: [],
      };
      const mockOrderToProduct : OrderToProduct[] = []
      const mockProduct: Product = {
        id: 1,
        name: "Product 1",
        price: 100,
        quantity: 10,
        image: "image1.jpg",
        category: mockCategory1,
        orderToProduct: mockOrderToProduct,
      };
      jest.spyOn(repository, "getProductById").mockResolvedValue(mockProduct);

      const product = await repository.getProductById(1);

      expect(product).toEqual(mockProduct);
    });

    it("should return null if product is not found", async () => {
      jest.spyOn(repository, "getProductById").mockResolvedValue(null);

      const product = await repository.getProductById(1);

      expect(product).toBeNull();
    });

    it("should throw an error if something goes wrong", async () => {
      const error = new Error("Something went wrong");
      jest.spyOn(repository, "getProductById").mockRejectedValue(error);

      await expect(repository.getProductById(1)).rejects.toThrow(error);
    });
  });

  describe("getProductsByCategoryId", () => {
    it("should return products for the given category id", async () => {
      const mockCategory1: Category = {
        id: 1,
        name: "Test Category",
        description: "Test Description",
        products: [],
      };
      const mockProduct: Product[] = [
        {
          id: 1,
          name: "Product 1",
          price: 100,
          quantity: 10,
          image: "image1.jpg",
          category: mockCategory1,
          orderToProduct: [],
        },
      ];
      jest
        .spyOn(repository, "getProductsByCategoryId")
        .mockResolvedValue(mockProduct);

      const product = await repository.getProductsByCategoryId(1);

      expect(product).toEqual(mockProduct);
    });

    it("should return null if no products found for the category", async () => {
      jest.spyOn(repository, "getProductsByCategoryId").mockResolvedValue(null);
  
      const product = await repository.getProductsByCategoryId(1);
  
      expect(product).toBeNull();
    });
  
  });

  
  describe('getDetailsForCart', () => {
    it('should return products for the given product ids', async () => {
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
      const mockProducts = [
        { id: 1, name: 'Product 1', quantity: 10, price: 100, image: 'image1.jpg', category: mockCategory1, orderToProduct: []},
        { id: 2, name: 'Product 2', quantity: 20, price: 200, image: 'image2.jpg', category: mockCategory2, orderToProduct: []}
      ];
      jest.spyOn(repository, 'getDetailsForCart').mockResolvedValue(mockProducts);
  
      const result = await repository.getDetailsForCart([1, 2]);
  
      expect(result).toEqual(mockProducts);
      expect(repository.getDetailsForCart).toHaveBeenCalledWith([1, 2]);
    });
  
    it('should return null if no products found for the given ids', async () => {
      jest.spyOn(repository, 'getDetailsForCart').mockResolvedValue(null);
  
      const result = await repository.getDetailsForCart([1, 2]);
  
      expect(result).toBeNull();
      expect(repository.getDetailsForCart).toHaveBeenCalledWith([1, 2]);
    });
  });
});
