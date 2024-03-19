import { Order } from "./entity/order";

export interface IOrderRepository {
  getOrderHistory(): Promise<Order[] | null>;

}