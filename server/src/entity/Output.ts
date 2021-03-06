import {
  Column,
  BaseEntity,
  CreateDateColumn,
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
  BeforeInsert,
  Index,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { DataOutputType } from "../types/schema";
import { Property } from "./Property";

// extending BaseEntity allows us to do things like User.create({})
@Entity()
// @Index(["type", "property"], { unique: true })
export class Outputs extends BaseEntity {
  @PrimaryColumn("uuid") id: string;

  @Column("json")
  output: any;

  @Column({ type: "enum", enum: ["exec_weekly", "exec_daily", "exec_hourly"] })
  type: DataOutputType;

  @CreateDateColumn()
  createdDate: Date;

  @ManyToOne((_type) => Property, (property) => property.id)
  @JoinColumn({ name: "property_id" })
  property: Property;

  @BeforeInsert()
  addId() {
    this.id = uuid();
  }
}
