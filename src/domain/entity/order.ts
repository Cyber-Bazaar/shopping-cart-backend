import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Category } from "./category";
import { OrderToProduct } from "./orderToProduct";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  mailingAddress: string;

  @OneToMany(() => OrderToProduct, (orderToProduct) => orderToProduct.product)
  orderToProduct: OrderToProduct[];
}
