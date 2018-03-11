import * as moment from "moment";
export class Reminder {
  readonly text: string;
  readonly time: number;
  readonly user: string;
  constructor(text, time, user_id) {
    this.text = text;
    /* convert to unix time in seconds */
    this.time = +moment(time).format("X");
    this.user = user_id;
  }
}
