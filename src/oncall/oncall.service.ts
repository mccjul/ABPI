import { Component } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MongoRepository } from "typeorm";
import { Schedule } from "./oncall.entity";
import { ScheduleDto } from "./oncall.dto";

@Component()
export class OncallService {
  constructor(
    @InjectRepository(Schedule)
    private readonly oncallRepository: MongoRepository<Schedule>
  ) {}

  async findAll(): Promise<Schedule[]> {
    return await this.oncallRepository.find();
  }

  async create(schedules: [ScheduleDto]): Promise<Schedule[]> {
    const obj = this.oncallRepository.create(schedules);
    await this.oncallRepository.save(obj);
    return obj;
  }
}
