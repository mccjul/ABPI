export class ScheduleDto {
  readonly id: string;

  readonly user: {
    readonly id: string;
    readonly name: string;
    readonly real_name: string;
  };

  readonly startDate: string;

  readonly endDate: string;
}
