import { OrderController } from "../../presentation/controllers/order.controller";
import { OrderService } from "../../application/order.service";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

interface CustomRequest extends Request {
  tokenPayload?: { sub: string };
}

describe("OrderController", () => {
  let mockOrderService: Partial<OrderService>;
  let controller: OrderController;
  let mockRequest: Partial<CustomRequest>;
  let mockResponse: Partial<Response>;
  let mockNextFunction: jest.Mock;
  let mockJson: jest.Mock;

  beforeEach(() => {
    mockOrderService = {
      getOrderHistory: jest.fn(),
    };
    controller = new OrderController(mockOrderService as OrderService);

    mockJson = jest.fn();
    mockRequest = {
      tokenPayload: { sub: 'testSub' },
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: mockJson,
    };
    mockNextFunction = jest.fn();
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
        }
      ];

      (mockOrderService.getOrderHistory as jest.Mock).mockResolvedValue(mockOrderHistory);

      await controller.getOrderHistory(mockRequest as Request, mockResponse as Response);

      expect(mockOrderService.getOrderHistory).toHaveBeenCalledWith('testSub');
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith({ message: "success", data: mockOrderHistory });
    });

    it("should return 401 if no tokenPayload", async () => {
      mockRequest.tokenPayload = undefined;

      await controller.getOrderHistory(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockJson).toHaveBeenCalledWith({ message: "Unauthorized" });
    });

    it("should return 500 if service throws an error", async () => {
      (mockOrderService.getOrderHistory as jest.Mock).mockRejectedValue(new Error('Test error'));

      await controller.getOrderHistory(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({ message: "Internal server error" });
    });
  });
});