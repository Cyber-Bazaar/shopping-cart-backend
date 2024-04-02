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
            "address_line2": "Colombo 03",
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
            "address_line2": "Colombo 03",
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

  describe("createOrder", () => {
    it("should create an order and return it", async () => {
      const mockOrder = { "first_name": "Rumindu",
      "last_name": "Kavishka",
      "address_line1": "3rd lane",
      "address_line2": "Batapola road, Meetiyagoda",
      "zip_code": "8080",
      "shipping_method": "Ponny express",
      "orderInfo": [{
        "productId": 2,
        "unitPrice": 43.50,
        "quantity": 51
      },
      {
        "productId": 1,
        "unitPrice": 23.40,
        "quantity": 34
      },
     ] };
      mockOrderRepository.create = jest.fn().mockResolvedValue(mockOrder);
      
      const result = await service.createOrder(mockOrder, 'testSub');
      
      expect(mockOrderRepository.create).toHaveBeenCalledWith(mockOrder, 'testSub');
      expect(result).toEqual(mockOrder);
    });
  
    it("should throw an error if there is a problem", async () => {
      const mockError = new Error("Error while fetching products");
      mockOrderRepository.create = jest.fn().mockRejectedValue(mockError);
      
      await expect(service.createOrder({"first_name": "Rumindu",
      "last_name": "Kavishka",
      "address_line1": "3rd lane",
      "address_line2": "Batapola road, Meetiyagoda",
      "zip_code": "8080",
      "shipping_method": "Ponny express",
      "orderInfo": [{
        "productId": 2,
        "unitPrice": 43.50,
        "quantity": 51
      }]}, 'testSub')).rejects.toThrow(mockError);
    });
  });
});