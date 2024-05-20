import { IOrderRepository } from "../domain/i.order.repository";
import { Injectable, Inject } from "../presentation/utils/dIContainer";
const { MailtrapClient } = require("mailtrap");

interface item {
  product: {
    name: string;
  };
  unitPrice: number;
  quantity: number;
  total: number;

}
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
    @Inject("OrderRepository") private orderRepository: IOrderRepository,
    @Inject("EmailService") private emailService: any
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
      const items: item[] = orderInfoForEmail.orderInfo.map((item: OrderItem) => ({
        product: {
          name: item.name
        },
        unitPrice: item.price,
        quantity: item.quantity,
        total: (+item.price * +item.quantity).toFixed(2)
      }));
      let grandTotal = 0;
      for (let i=0; i<items.length; i++) {
        grandTotal = grandTotal+ (+items[i].total);
      }
      this.emailService.sendEmail(orderInfoForEmail, items, grandTotal);
    } catch (error) {
      console.error("Error while fetching products:", error);
      throw error;
    }
  }
}

