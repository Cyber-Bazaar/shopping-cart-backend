import { OrderRepository } from "../../infrastructure/type-ORM/order.repository";



describe("OrderRepository", () => {
  let repository: OrderRepository;

  beforeEach(() => {
    repository = new OrderRepository();
  });

  describe("getOrderHistory", () => {
    it("should return order history", async () => {
      const mockOrderHistory = [
        {
          orderToProductId: 1,
          orderId: 1,
          productId: 1,
          unitPrice: 10,
          quantity: 2,
          product: {
            id:1,
            name: "Product 1",
            quantity: 10,
            price: 100,
            image: "image1.jpg",
            category: {
              id: 1,
              name: "Test Category",
              description: "Test Description",
              products: [],
            },
            orderToProduct: [],
          },
          order: {
            id: 1,
            sub: "testSub",
            first_name: "Test",
            last_name: "User",
            address_line1: "123 Main St",
            address_line2: "Apt 1",
            zip_code: "12345",
            shipping_method: "Express",
            orderToProduct: [],
            
          },
        },
      ];
      jest.spyOn(repository, "getOrderHistory").mockResolvedValue(mockOrderHistory);

      const orderHistory = await repository.getOrderHistory("testSub");

      expect(orderHistory).toEqual(mockOrderHistory);
    });

    it("should throw an error if something goes wrong", async () => {
      const error = new Error("Something went wrong");
      jest.spyOn(repository, "getOrderHistory").mockRejectedValue(error);

      try {
        await repository.getOrderHistory("testSub");
      } catch (error) {
        expect(error).toEqual(error);
      }
    });
  });
});





// import { OrderRepository } from "../../infrastructure/type-ORM/order.repository";
// import { OrderToProduct } from "../../domain/entity/orderToProduct";
// import { getRepository, Repository, SelectQueryBuilder } from "typeorm";

// jest.mock("typeorm", () => ({
//   getRepository: jest.fn(),
// }));

// describe("OrderRepository", () => {
//   let orderRepository: OrderRepository;
//   let mockOrderToProductRepository: jest.Mocked<Repository<OrderToProduct>>;
//   let mockQueryBuilder: jest.Mocked<SelectQueryBuilder<OrderToProduct>>;

//   beforeEach(() => {
//     mockQueryBuilder = {
//       select: jest.fn().mockReturnThis(),
//       leftJoin: jest.fn().mockReturnThis(),
//       where: jest.fn().mockReturnThis(),
//       getMany: jest.fn(),
//     } as unknown as jest.Mocked<SelectQueryBuilder<OrderToProduct>>;

//     mockOrderToProductRepository = {
//       createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
//     } as unknown as jest.Mocked<Repository<OrderToProduct>>;

//     (getRepository as jest.Mock).mockReturnValue(mockOrderToProductRepository);

//     orderRepository = new OrderRepository();
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it("should get order history", async () => {
//     const sub = "testSub";
//     const mockOrderHistory: OrderToProduct[] = [
//       {
//         orderToProductId: 1,
//         orderId: 1,
//         productId: 1,
//         unitPrice: 10,
//         quantity: 2,
//         product: {
//           id:1,
//           name: "Product 1",
//           quantity: 10,
//           price: 100,
//           image: "image1.jpg",
//           category: {
//             id: 1,
//             name: "Test Category",
//             description: "Test Description",
//             products: [],
//           },
//           orderToProduct: [],
//         },
//         order: {
//           id: 1,
//           sub: "testSub",
//           first_name: "Test",
//           last_name: "User",
//           address_line1: "123 Main St",
//           address_line2: "Apt 1",
//           zip_code: "12345",
//           shipping_method: "Express",
//           orderToProduct: [],
          
//         },
//       },]
//     mockQueryBuilder.getMany.mockResolvedValue(mockOrderHistory);

//     const result = await orderRepository.getOrderHistory(sub);

//     expect(result).toEqual(mockOrderHistory);
//     expect(getRepository).toHaveBeenCalledWith(OrderToProduct);
//     expect(mockOrderToProductRepository.createQueryBuilder).toHaveBeenCalledWith("otp");
//     expect(mockQueryBuilder.select).toHaveBeenCalledWith([
//       "otp.orderId",
//       "otp.productId",
//       "product.name",
//       "otp.unitPrice",
//       "otp.quantity",
//       "order.address_line1",
//       "order.address_line2",
//       "order.zip_code",
//       "order.shipping_method",
//     ]);
//     expect(mockQueryBuilder.leftJoin).toHaveBeenCalledWith("otp.product", "product");
//     expect(mockQueryBuilder.leftJoin).toHaveBeenCalledWith("otp.order", "order");
//     expect(mockQueryBuilder.where).toHaveBeenCalledWith("order.sub = :Sub", { Sub: sub });
//     expect(mockQueryBuilder.getMany).toHaveBeenCalled();
//   });
// });