import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany,BeforeInsert } from "typeorm";
import moment from 'moment-timezone';
import { Category } from "./category";import { OrderToProduct } from "./orderToProduct";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sub: string;

  @Column({ type: 'timestamp' })
  createdAt: Date;

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

  @BeforeInsert()
  setCreatedAt() {
    this.createdAt = moment.utc().tz('Asia/Colombo').toDate();
  }

  @OneToMany(() => OrderToProduct, (orderToProduct) => orderToProduct.order,{cascade: true})
  orderToProduct: OrderToProduct[];
}
