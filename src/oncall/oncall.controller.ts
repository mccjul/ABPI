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

  // TODO: query by date
  @Get("/date:date")
  async getNameByDate() {}

  // TODO: query by name
  @Get("/name:name")
  async getDateByName() {}

  @Put("/:id")
  async updateSchedual(@Param() params, @Body() schedule: ScheduleDto) {
    return await this.oncallService.update(params.id, schedule);
  }

  @Delete("/:id")
  async deleteSchedual(@Param() params) {
    return await this.oncallService.delete(params.id);
  }

  @Post()
  async create(@Body() schedules: [ScheduleDto]): Promise<Schedule[]> {
    return this.oncallService.create(schedules);
  }
}
