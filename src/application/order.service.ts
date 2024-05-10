import { IOrderRepository } from "../domain/i.order.repository";
import { Injectable, Inject } from "../presentation/utils/dIContainer";
const { MailtrapClient } = require("mailtrap");

interface OrderItem {
  image: string;
  name: string;
  price: number;
  quantity: number;
}

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
@Injectable()
export class OrderService {
  constructor(
    @Inject("OrderRepository") private orderRepository: IOrderRepository

  ) { }
  async getOrderHistory(sub?: string) {
    try {
      return await this.orderRepository.getOrderHistory(sub);
    } catch (error) {
      console.error("Error while fetching products:", error);
      throw error;
    }
  }
  async createOrder(order: OrderData, sub: string) {
    try {
      const orderInfo = await this.orderRepository.create(order, sub);
  
      const orderInfoForEmail = await this.orderRepository.getOrderDetails(orderInfo.id, sub);
      console.log(orderInfoForEmail)
      const TOKEN = "d7e52d658fc81ad4b161cc4f4ec60c8d";
      const ENDPOINT = "https://send.api.mailtrap.io/";
      const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });
      const sender = {
        email: "mailtrap@demomailtrap.com",
        name: "Shopping Cart",
      };
      const recipients = [
        {
          email: "rumindukavishka14@gmail.com",
        }
      ];
      const items = orderInfoForEmail.orderInfo.map((item: OrderItem) => ({
        product: {
          name: item.name
        },
        unitPrice: item.price,
        quantity: item.quantity,
        total: (item.price * item.quantity).toString()
      }));
  
      const grandTotal = items.reduce((total:number, item:{ total: string }) => total + parseFloat(item.total), 0);
      
      const info = await client.send({
        from: sender,
        to: recipients,
        template_uuid: "7ee09d6e-9b62-4e64-b345-5a542ee69e9c",
        template_variables: {
          "orderId": orderInfoForEmail.id.toString(),
          "orderDate": orderInfoForEmail.createdAt.toString(),
          "orderStatus": "Test_OrderStatus", // Replace with actual order status
          "streetNo": "Test_StreetNo", // Replace with actual street number
          "street1": orderInfoForEmail.address_line1,
          "zip": orderInfoForEmail.zip_code,
          "fullName": `${orderInfoForEmail.first_name} ${orderInfoForEmail.last_name}`,
          "email": "rumindukavishka14@gmail.com",
          "items": items,
          "grandTotal": grandTotal.toString() // Include grandTotal in your email data
        }
      });
  
  
    } catch (error) {
      console.error("Error while fetching products:", error);
      throw error;
    }
  }
}