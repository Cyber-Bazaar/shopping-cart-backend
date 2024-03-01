import { ProductRepository } from "../../infrastructure/type-ORM/product.repository";
import { Product } from "../../domain/entity/product";

describe("ProductRepository", () => {
  let repository: ProductRepository;

  beforeEach(() => {
    repository = new ProductRepository();
  });

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
