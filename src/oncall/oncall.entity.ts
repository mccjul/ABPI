import { Entity, Column, ObjectIdColumn, ObjectID } from "typeorm";

@Entity({ name: "schedules" })
export class Schedule {
  @ObjectIdColumn() id: ObjectID;

  @Column() name: string;

  @Column() startDate: Date;

  @Column() endDate: Date;
}
