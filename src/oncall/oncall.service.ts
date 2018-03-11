import { Component, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MongoRepository } from "typeorm";
import { Schedule } from "./oncall.entity";
import { ScheduleDto } from "./oncall.dto";
import { SlackService } from "../common/slack.service";
import { ObjectId } from "mongodb";

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

  async findbyDate(date: Date) {
    const _date = new Date(date);
    // console.log(_date);

    const _aggregate = this.oncallRepository.aggregate([
      {
        $match: {
          $and: [
            {
              startDate: { $gt: _date }
            },
            {
              endDate: { $lt: _date }
            }
          ]
        }
      },
      {
        $project: {
          startDate: 1,
          endDate: 1,
          user: { real_name: 1 }
        }
      }
    ]);
    return await _aggregate.next();
  }

  async findbyName(name: string) {
    // console.log(name);
    const _date = new Date();

    const _aggregate = this.oncallRepository.aggregate([
      {
        $match: {
          // $and: [
          //   {
          //     user: { real_name: name }
          //   }
          //   {
          //     startDate: { $gt: _date }
          //   }
          // ]
          user: { real_name: name }
        }
      },
      {
        $project: {
          startDate: 1,
          endDate: 1,
          user: { real_name: 1 }
        }
      }
    ]);
    return await _aggregate.next();
  }

  async create(schedules: [ScheduleDto]): Promise<Schedule[]> {
    const obj = this.oncallRepository.create(schedules);
    const prepared_obj = await this.slackService.onCreateReminders(
      obj.map(elm => {
        elm.startDate = new Date(elm.startDate);
        elm.endDate = new Date(elm.endDate);
        return elm;
      })
    );
    return await this.oncallRepository.save(prepared_obj);
  }

  async update(id: string, schedule: ScheduleDto): Promise<void> {
    const obj = this.oncallRepository.create(schedule);
    obj.startDate = new Date(obj.startDate);
    obj.endDate = new Date(obj.endDate);
    const prepared_obj = await this.slackService.updateReminder(obj);
    await this.oncallRepository.findOneAndUpdate(
      { _id: ObjectId(id) },
      prepared_obj
    );
  }

  async delete(id: string): Promise<void> {
    const { value } = await this.oncallRepository.findOneAndDelete({
      _id: ObjectId(id)
    });
    await this.slackService.deleteReminder(
      value.reminder_access,
      value.reminder_oncall
    );
  }
}
