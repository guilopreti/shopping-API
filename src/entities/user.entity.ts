import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Cart } from "./cart.entity";

@Entity()
export class User {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToOne((type) => Cart, {
    eager: true,
  })
  @JoinColumn()
  cart: Cart;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
