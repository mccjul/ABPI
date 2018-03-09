import { Entity, Column, ObjectIdColumn, ObjectID } from "typeorm";

@Entity({ name: "schedules" })
export class Schedule {
  @ObjectIdColumn() id: ObjectID;

  @Column()
  user: {
    id: string;
    name: string;
    real_name: string;
  };

  @Column() startDate: Date;

  @Column() endDate: Date;

  @Column() reminder_access: string;

  @Column() reminder_oncall: string;
}
