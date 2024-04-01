import { IOrderRepository } from "../../domain/i.order.repository";
import { OrderToProduct } from "../../domain/entity/orderToProduct";
import { Order } from "../../domain/entity/order";
import { DataSource, In } from "typeorm";
import { AppDataSource } from "../../config/data.source";


export class OrderRepository implements IOrderRepository {
  private readonly db: DataSource;

  constructor() {
    this.db = AppDataSource;
  }

  async getOrderHistory(sub?: string): Promise<any> {
    return await this.db.getRepository(OrderToProduct)
      .createQueryBuilder('otp')
      .select(['otp.orderId', 'otp.productId', 'product.name', 'otp.unitPrice', 'otp.quantity',
        'order.address_line1', 'order.address_line2', 'order.zip_code', 'order.shipping_method'])
      .leftJoin('otp.product', 'product')
      .leftJoin('otp.order', 'order')
      .where('order.sub = :Sub', { Sub: sub })
      .getMany();
  }

  async create(order: any, sub: string): Promise<any> {
    const orderEntity = new Order();
    orderEntity.first_name = order.first_name;
    orderEntity.last_name = order.last_name;
    
    orderEntity.address_line1 = order.address_line1;
    orderEntity.address_line2 = order.address_line2;
    orderEntity.zip_code = order.zip_code;
    orderEntity.shipping_method = order.shipping_method;
    orderEntity.sub = sub;
    const orderResult = await this.db.getRepository(Order).save(orderEntity);

    const orderToProductEntity = new OrderToProduct();
    orderToProductEntity.orderId = orderResult.id;
    orderToProductEntity.productId = order.orderInfo.productId;
    orderToProductEntity.unitPrice = order.orderInfo.unitPrice;
    orderToProductEntity.quantity = order.orderInfo.quantity;
    return await this.db.getRepository(OrderToProduct).save(orderToProductEntity);
  }

}
