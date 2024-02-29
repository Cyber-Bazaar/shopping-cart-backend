import { ProductService } from "../../application/product.service";
import { IProductRepository } from "../../domain/i.product.repository";

describe("ProductService", () => {
  let productService: ProductService;
  let mockProductRepository: jest.Mocked<IProductRepository>;

  beforeEach(() => {
    mockProductRepository = {
      getAllProducts: jest.fn(),
    } as jest.Mocked<IProductRepository>;

    productService = new ProductService(mockProductRepository);
  });

  it("should return all products", async () => {
    // Arrange
    const expectedProducts = [
      {
        id: 1,
        name: "Test Product 1",
        quantity: 10,
        price: 100,
        image: "test-image1.jpg",
      },
      // Add more products as needed
    ];
    mockProductRepository.getAllProducts.mockResolvedValue(expectedProducts);

    // Act
    const products = await productService.getProduct();

    // Assert
    expect(products).toEqual(expectedProducts);
    expect(mockProductRepository.getAllProducts).toHaveBeenCalled();
  });
});
