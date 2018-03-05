import { Module, Logger } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// import { AppController } from "./app.controller";
import { OncallModule } from "./oncall/oncall.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mongodb",
      database: "local",
      host: "localhost", // for docker mongodb
      entities: [__dirname + "/../**/*.entity{.ts,.js}"],
      synchronize: true
    }),
    OncallModule,
    Logger
  ],
  controllers: [],
  components: []
})
export class ApplicationModule {}
