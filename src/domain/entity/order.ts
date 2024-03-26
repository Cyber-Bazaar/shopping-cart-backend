import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Category } from "./category";
import { OrderToProduct } from "./orderToProduct";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sub: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  address_line1: string;

  @Column()
  address_line2: string;

  @Column()
  zip_code: string;

  @Column()
  shipping_method: string;

  @OneToMany(() => OrderToProduct, (orderToProduct) => orderToProduct.product)
  orderToProduct: OrderToProduct[];
}
