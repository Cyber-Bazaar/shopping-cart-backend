import { IOrderRepository } from "../domain/i.order.repository";
import { Injectable, Inject } from "../presentation/utils/dIContainer";
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
  async createOrder(order: any, sub: string) {
    try {
      return await this.orderRepository.create(order, sub);
    } catch (error) {
      console.error("Error while fetching products:", error);
      throw error;
    }
  }
}