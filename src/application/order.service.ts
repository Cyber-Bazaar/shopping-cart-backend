import { IOrderRepository } from "../domain/i.order.repository";
import { Injectable, Inject } from "../presentation/utils/dIContainer";
@Injectable()
export class OrderService {
  constructor(
    @Inject("OrderRepository") private orderRepository: IOrderRepository
  ) {}
  async getOrderHistory() {
    try {
      return await this.orderRepository.getOrderHistory();
    } catch (error) {
      console.error("Error while fetching products:", error);
      throw error;
    }
  }
}