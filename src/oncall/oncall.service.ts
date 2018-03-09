import { Component, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MongoRepository } from "typeorm";
import { Schedule } from "./oncall.entity";
import { ScheduleDto } from "./oncall.dto";
import { SlackService } from "../common/slack.service";

@Component()
export class OncallService {
  constructor(
    @InjectRepository(Schedule)
    private readonly oncallRepository: MongoRepository<Schedule>,
    private readonly slackService: SlackService
  ) {}

  async findAll(): Promise<Schedule[]> {
    return await this.oncallRepository.find();
  }

  async create(schedules: [ScheduleDto]): Promise<Schedule[]> {
    const obj = this.oncallRepository.create(schedules);
    const prepared_obj = await this.slackService.onCreateReminders(obj);
    await this.oncallRepository.save(prepared_obj);
    return prepared_obj;
  }
}
