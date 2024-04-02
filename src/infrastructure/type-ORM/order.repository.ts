import { IOrderRepository } from "../../domain/i.order.repository";
import { OrderToProduct } from "../../domain/entity/orderToProduct";
import { Order } from "../../domain/entity/order";
import { DataSource } from "typeorm";
import { AppDataSource } from "../../config/data.source";

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

  async create(order: OrderData, sub: string): Promise<any> {
    try {
      await this.db.manager.transaction(async transactionalEntityManager => {
        const orderEntity = new Order();
        orderEntity.first_name = order.first_name;
        orderEntity.last_name = order.last_name;
        orderEntity.address_line1 = order.address_line1;
        orderEntity.address_line2 = order.address_line2;
        orderEntity.zip_code = order.zip_code;
        orderEntity.shipping_method = order.shipping_method;
        orderEntity.sub = sub;

        const orderResult = await transactionalEntityManager.save(orderEntity);

        for (let orderInfo of order.orderInfo) {
          let orderToProductEntity = new OrderToProduct();
          orderToProductEntity.orderId = orderResult.id;
          orderToProductEntity.productId = orderInfo.productId;
          orderToProductEntity.order = orderResult;
          orderToProductEntity.unitPrice = orderInfo.unitPrice;
          orderToProductEntity.quantity = orderInfo.quantity;
        
          await transactionalEntityManager.save(orderToProductEntity);
        }
        return orderResult;
      })
    } catch (error) {
      console.error('Transaction failed:', error);
      throw error;
    }
  }

}
