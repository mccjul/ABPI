import { Module, Logger } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { OncallModule } from "./oncall/oncall.module";

import envConfig from "./config.env";
const { ormtype: ormConfig } = envConfig;

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig), OncallModule, Logger],
  controllers: [],
  components: []
})
export class ApplicationModule {}
