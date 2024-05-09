import { Order } from "./entity/order";
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

interface OrderInfoHistory {
  productId: number;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

interface AllOrderHistory {
  id: number;
  sub: string;
  createdAt: Date;
  first_name: string;
  last_name: string;
  address_line1: string;
  address_line2: string;
  zip_code: string;
  shipping_method: string;
  orderInfo: OrderInfoHistory[];
}


export interface IOrderRepository {
  getOrderDetails(orderId: number, sub: string): Promise<Order>;
  getOrderHistory(sub?:string): Promise<AllOrderHistory[]>;
  create(order: any, sub: string): Promise<Order>;
}