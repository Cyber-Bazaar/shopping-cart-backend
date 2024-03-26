import { IOrderRepository } from "../../domain/i.order.repository";
import { Order } from "../../domain/entity/order";
import { OrderToProduct } from "../../domain/entity/orderToProduct";
import { DataSource, In } from "typeorm";
import { AppDataSource } from "../../config/data.source";
import { Product } from "../../domain/entity/product";

export class OrderRepository implements IOrderRepository {
  private readonly db: DataSource;

  constructor() {
    this.db = AppDataSource;
  }

async getOrderHistory(): Promise<any> {
  return await this.db.getRepository(OrderToProduct)
    .createQueryBuilder('otp')
    .select(['otp.orderId', 'otp.productId', 'product.name', 'otp.unitPrice', 'otp.quantity','order.address_line1', 'order.address_line2', 'order.zip_code', 'order.shipping_method'])
    .leftJoin('otp.product', 'product')
    .leftJoin('otp.order', 'order')
    .where('order.sub = :sub', { sub: 'auth'})
    .getMany();
}

// async getOrderHistory(): Promise<any> {
//   return await this.db.getRepository(Order)
// .createQueryBuilder('order')
//   .select([
//     'order.id', 
//     'order.sub', 
//     'order.first_name', 
//     'order.last_name', 
//     'order.address_line1', 
//     'order.address_line2', 
//     'order.zip_code', 
//     'order.shipping_method',
//     'orderToProduct.productId',
//     'product.name'
//   ])
//   .innerJoin('order.orderToProduct', 'orderToProduct')
//   .innerJoin('orderToProduct.product', 'product')
//   .getMany();
// }

}
