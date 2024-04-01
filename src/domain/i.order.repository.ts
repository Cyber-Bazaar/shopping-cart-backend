import { Order } from "./entity/order";

export interface IOrderRepository {
  getOrderHistory(sub?:string): Promise<Order[] | null>;
  create(order: any, sub: string): Promise<Order | null>;
}