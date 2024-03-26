import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Product } from "./product";
import { Order } from "./order";

@Entity()
export class OrderToProduct {
  @PrimaryGeneratedColumn()
  orderToProductId: number;

  @Column()
  orderId: string;

  @Column()
  productId: number;

  @Column()
  quantity: number;

  @Column({type: "decimal", precision: 10, scale: 2})
  unitPrice: number;

  @ManyToOne(() => Product, (product) => product.orderToProduct)
  product: Product;

  @ManyToOne(() => Order, (order) => order.orderToProduct)
  order: Order;
}
