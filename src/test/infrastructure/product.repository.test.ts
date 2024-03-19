import { ProductRepository } from "../../infrastructure/type-ORM/product.repository";
import { Product } from "../../domain/entity/product";

describe("ProductRepository", () => {
  let repository: ProductRepository;

  beforeEach(() => {
    repository = new ProductRepository();
  });

  describe("getAllProducts", () => {
    it("should return all products", async () => {
      const mockProducts: Product[] = [
        {
          id: 1,
          name: "Product 1",
          price: 100,
          quantity: 10,
          image: "image1.jpg",
        },
        {
          id: 2,
          name: "Product 2",
          price: 200,
          quantity: 20,
          image: "image2.jpg",
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
      const mockProduct: Product = {
        id: 1,
        name: "Product 1",
        price: 100,
        quantity: 10,
        image: "image1.jpg",
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
});
