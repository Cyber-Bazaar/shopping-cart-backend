import { ProductService } from "../../application/product.service";
import { IProductRepository } from "../../domain/i.product.repository";

describe("ProductService", () => {
  let productService: ProductService;
  let mockProductRepository: jest.Mocked<IProductRepository>;

  beforeEach(() => {
    mockProductRepository = {
      getProduct: jest.fn(),
      getAllProducts: jest.fn(), // Mock the getAllProducts method
      // Mock other methods as needed
    } as jest.Mocked<IProductRepository>;

    productService = new ProductService(mockProductRepository);
  });

  it("should return a product", async () => {
    // Arrange
    const expectedProduct = [
      {
        id: 1,
        name: "Test Product",
        quantity: 10,
        price: 100,
        image: "test-image.jpg",
      },
    ];
    mockProductRepository.getAllProducts.mockResolvedValue(expectedProduct);

    // Act
    const product = await productService.getProduct(); // Remove the argument

    // Assert
    expect(product).toEqual(expectedProduct);
    expect(mockProductRepository.getAllProducts).toHaveBeenCalled(); // Check that the method was called, but don't check the arguments
  });

  // Add more tests for other methods and scenarios
});
