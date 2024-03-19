import { IOrderRepository } from "../../domain/i.order.repository";
import { Order } from "../../domain/entity/order";
import { DataSource, In } from "typeorm";
import { AppDataSource } from "../../config/data.source";

export class OrderRepository implements IOrderRepository {
  private readonly db: DataSource;

  constructor() {
    this.db = AppDataSource;
  }

  async getOrderHistory(): Promise<any> {
    const user_id = 1;
    return await this.db.getRepository(Order)
        .createQueryBuilder("order")
        .leftJoinAndSelect("order.orderToProduct", "orderToProduct")
        .leftJoinAndSelect("orderToProduct.product", "product")
        .getMany();
}
}
