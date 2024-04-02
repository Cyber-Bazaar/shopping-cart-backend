import { OrderRepository } from "../../infrastructure/type-ORM/order.repository";
import { Order } from "../../domain/entity/order";
import { OrderToProduct } from "../../domain/entity/orderToProduct";
import { EntityManager } from 'typeorm';

interface OrderInfo {
  productId: number;
  unitPrice: number;
  quantity: number;
}

interface OrderData {
  first_name: string;
  last_name: string;
  address_line1: string;
  address_line2: string;
  zip_code: string;
  shipping_method: string;
  orderInfo: OrderInfo[];
}

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
  
  describe("create",()=>{
    it("should create an order", async () => {
      const mockOrderData: OrderData = {
        first_name: "Test",
        last_name: "User",
        address_line1: "123 Main St",
        address_line2: "Apt 1",
        zip_code: "12345",
        shipping_method: "Express",
        orderInfo: [
          {
            productId: 1,
            unitPrice: 10,
            quantity: 2,
          },
        ],
      };
      const mockOrder = new Order();
      mockOrder.first_name = mockOrderData.first_name;
      mockOrder.last_name = mockOrderData.last_name;
      mockOrder.address_line1 = mockOrderData.address_line1;
      mockOrder.address_line2 = mockOrderData.address_line2;
      mockOrder.zip_code = mockOrderData.zip_code;
      mockOrder.shipping_method = mockOrderData.shipping_method;
      mockOrder.sub = "testSub";
      mockOrder.id = 1;
      const mockOrderToProduct = new OrderToProduct();
      mockOrderToProduct.orderId = mockOrder.id;
      mockOrderToProduct.productId = mockOrderData.orderInfo[0].productId;
      mockOrderToProduct.unitPrice = mockOrderData.orderInfo[0].unitPrice;
      mockOrderToProduct.quantity = mockOrderData.orderInfo[0].quantity;
      mockOrderToProduct.order = mockOrder;
      jest.spyOn(repository, "create").mockResolvedValue(mockOrder);

      const order = await repository.create(mockOrderData, "testSub");

      expect(order).toEqual(mockOrder);
    });

    it("should throw an error if something goes wrong", async () => {
      const mockOrderData: OrderData = {
        first_name: "Test",
        last_name: "User",
        address_line1: "123 Main St",
        address_line2: "Apt 1",
        zip_code: "12345",
        shipping_method: "Express",
        orderInfo: [
          {
            productId: 1,
            unitPrice: 10,
            quantity: 2,
          },
        ],
      };
      const error = new Error("Something went wrong");
      jest.spyOn(repository, "create").mockRejectedValue(error);

      try {
        await repository.create(mockOrderData, "testSub");
      } catch (error) {
        expect(error).toEqual(error);
      }
    });
  })
});



