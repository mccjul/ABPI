import { Component } from "@nestjs/common";
import { slackProvider } from "./providers";
import { WebClient } from "@slack/client";

@Component()
export class SlackService {
  webclient: any;
  constructor() {
    this.webclient = new WebClient(slackProvider);
  }

  async getUserList() {
    const list = await this.webclient.users.list();
    return list.members
      .filter(elm => !elm.is_bot && !(elm.name === "slackbot"))
      .map(elm => ({ id: elm.id, name: elm.name, real_name: elm.real_name }));
  }
}
