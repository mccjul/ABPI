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
import { SlackService } from "../common/slack.service";

@Controller("oncall")
export class OncallController {
  constructor(
    private readonly oncallService: OncallService,
    private readonly slackService: SlackService
  ) {}

  @Get()
  findAll(): Promise<Schedule[]> {
    return this.oncallService.findAll();
  }

  @Get("/users")
  getUsers() {
    return this.slackService.getUserList();
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
