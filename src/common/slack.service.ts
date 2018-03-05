import { Component } from "@nestjs/common";
import { slackProvider } from "./providers";
import { WebClient } from "@slack/client";

// An access token (from your Slack app or custom integration - xoxp, xoxb, or xoxa)
const token = process.env.SLACK_TOKEN;

const web = new WebClient(token);

@Component()
export class SlackService {
  webclient: any;
  constructor() {
    this.webclient = new WebClient(token);
  }
}
