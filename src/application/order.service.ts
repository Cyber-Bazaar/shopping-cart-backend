import { IOrderRepository } from "../domain/i.order.repository";
import { Injectable, Inject } from "../presentation/utils/dIContainer";

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
  ) {}
  async getOrderHistory(sub?:string) {
    try {
      return await this.orderRepository.getOrderHistory(sub);
    } catch (error) {
      console.error("Error while fetching products:", error);
      throw error;
    }
  }
  async createOrder(order: OrderData, sub: string) {
    try {
      return await this.orderRepository.create(order, sub);
    } catch (error) {
      console.error("Error while fetching products:", error);
      throw error;
    }
  }
}