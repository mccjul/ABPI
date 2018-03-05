import { NestFactory } from "@nestjs/core";
import { ApplicationModule } from "./app.module";
import "reflect-metadata";

async function bootstrap() {
  require("dotenv").config();
  const app = await NestFactory.create(ApplicationModule);
  app.enableCors();

  await app.listen(8080);
}
bootstrap();
