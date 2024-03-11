import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Category } from "./category"; // Import the Category entity

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  quantity: number;

  @Column({ nullable: true })
  image: string;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;
}
