import { config as dotenv } from "dotenv";

dotenv();

const config = {
  development: {
    cors: true,
    port: 8080,
    slackbot: process.env.SLACK_BOT,
    slackuser: process.env.SLACK_USER,
    recastai: "",
    auth0: "",
    ormtype: {
      type: "mongodb",
      host: "localhost",
      port: 27017,
      database: "abpi",
      // username: "user",
      // password: "password",
      authSource: "admin",
      synchronize: true,
      entities: ["src/**/**.entity{.ts,.js}"]
    }
  },
  production: {
    cors: false,
    port: 8080,
    slackbot: process.env.SLACK_BOT,
    slackuser: process.env.SLACK_USER,
    recastai: "",
    auth0: "",
    ormtype: {
      type: "mongodb",
      host: "mongodb",
      port: "27017",
      // username: "user",
      // password: "password",
      database: "abpi",
      authSource: "admin",
      synchronize: false,
      entities: ["dist/**/**.entity{.ts,.js}"]
    }
  }
};

const envConfig = config[process.env.NODE_ENV || "development"];

export default envConfig;
