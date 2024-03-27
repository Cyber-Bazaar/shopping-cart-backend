import { Order } from "./entity/order";

export interface IOrderRepository {
  getOrderHistory(sub?:string): Promise<Order[] | null>;
}