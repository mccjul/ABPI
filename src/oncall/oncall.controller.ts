import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Put,
  Delete,
  Logger
} from "@nestjs/common";
import { OncallService } from "./oncall.service";
import { Schedule } from "./oncall.entity";
import { ScheduleDto } from "./oncall.dto";

@Controller("oncall")
export class OncallController {
  constructor(private readonly oncallService: OncallService) {}

  @Get()
  findAll(): Promise<Schedule[]> {
    return this.oncallService.findAll();
  }

  // @Get(":id")
  // findOne(@Param() params): Promise<Schedule> {
  //   return this.oncallService.findOne(params.id);
  // }

  // TODO: query by date
  // TODO: query by month
  // TODO: query by name

  @Post()
  async create(@Body() schedules: [ScheduleDto]): Promise<Schedule[]> {
    Logger.log(JSON.stringify(schedules));
    return this.oncallService.create(schedules);
  }
}
