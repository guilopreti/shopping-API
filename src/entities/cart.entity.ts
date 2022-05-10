import { Entity, Column, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity()
export class Cart {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column("float")
  subtotal: number;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
