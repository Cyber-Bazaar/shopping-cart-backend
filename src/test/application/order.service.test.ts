import { OrderService } from "../../application/order.service";
import { IOrderRepository } from "../../domain/i.order.repository";

describe("OrderService", () => {
  let service: OrderService;
  let mockOrderRepository: Partial<IOrderRepository>;

  beforeEach(() => {
    mockOrderRepository = {
      getOrderHistory: jest.fn(),
    };
    service = new OrderService(mockOrderRepository as IOrderRepository);
  });

  describe("getOrderHistory", () => {
    it("should return order history", async () => {
      const mockOrderHistory = [
        {
          "orderId": 1,
          "productId": 1,
          "quantity": 4,
          "unitPrice": "34.00",
          "product": {
            "name": "sample_product_1"
          },
          "order": {
            "address_line1": "No25, School",
            "address_line2": "Coombo 03",
            "zip_code": "003",
            "shipping_method": ""
          }
        },
        {
          "orderId": 2,
          "productId": 2,
          "quantity": 2,
          "unitPrice": "12.00",
          "product": {
            "name": "sample_product_2"
          },
          "order": {
            "address_line1": "No25, School",
            "address_line2": "Coombo 03",
            "zip_code": "003",
            "shipping_method": ""
          }
        },
       
      ];

      (mockOrderRepository.getOrderHistory as jest.Mock).mockResolvedValue(mockOrderHistory);

      const result = await service.getOrderHistory('testSub');

      expect(mockOrderRepository.getOrderHistory).toHaveBeenCalledWith('testSub');
      expect(result).toEqual(mockOrderHistory);
    });

    it("should throw an error if repository throws an error", async () => {
      (mockOrderRepository.getOrderHistory as jest.Mock).mockRejectedValue(new Error('Test error'));

      await expect(service.getOrderHistory('testSub')).rejects.toThrow('Test error');
    });
  });
});