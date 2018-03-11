import { Component, Logger } from "@nestjs/common";
import envConfig from "../config.env";
import { WebClient } from "@slack/client";
import { Reminder } from "./slack.types";
import { Schedule } from "../oncall/oncall.entity";
import * as moment from "moment";

const { slackbot: slackbotToken, slackuser: slackuserToken } = envConfig;

@Component()
export class SlackService {
  bot_webclient: any;
  user_webclient: any;
  constructor() {
    this.bot_webclient = new WebClient(slackbotToken);
    this.user_webclient = new WebClient(slackuserToken);
  }

  async getUserList() {
    const list = await this.bot_webclient.users.list();
    return list.members
      .filter(elm => !elm.is_bot && !(elm.name === "slackbot"))
      .map(elm => ({ id: elm.id, name: elm.name, real_name: elm.real_name }));
  }

  async setReminder(reminder: Reminder) {
    return this.user_webclient.reminders.add({
      text: reminder.text,
      time: reminder.time,
      user: reminder.user
    });
  }

  async onCreateReminders(schedules: Schedule[]): Promise<Schedule[]> {
    const access_reminder_text = "You need to get your accesses";
    const oncall_reminder_text = "You are now oncall. Good Luck!";

    for (const schedule of schedules) {
      const { user, startDate } = schedule;

      const _access_date = moment(startDate.toISOString())
        .subtract(1, "week")
        .format();

      if (moment(_access_date).diff(moment()) > 0) {
        const access = await this.setReminder(
          new Reminder(access_reminder_text, _access_date, user.id)
        );
        schedule.reminder_access = access.reminder.id;
      }

      if (moment(startDate.toISOString()).diff(moment()) > 0) {
        const oncall = await this.setReminder(
          new Reminder(oncall_reminder_text, startDate.toISOString(), user.id)
        );
        schedule.reminder_oncall = oncall.reminder.id;
      }
    }

    return schedules;
  }

  async updateReminder(schedule: Schedule) {
    await this.deleteReminder(
      schedule.reminder_access,
      schedule.reminder_oncall
    );
    const sched_array = await this.onCreateReminders([schedule]);
    return sched_array[0];
  }

  async deleteReminder(access_reminder_id: string, oncall_reminder_id: string) {
    await this.user_webclient.reminders.delete({
      reminder: access_reminder_id
    });
    await this.user_webclient.reminders.delete({
      reminder: oncall_reminder_id
    });
  }
}
