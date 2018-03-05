import { Module, Logger } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Schedule } from "./oncall.entity";
import { OncallService } from "./oncall.service";
import { OncallController } from "./oncall.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Schedule]), Logger],
  components: [OncallService],
  controllers: [OncallController]
})
export class OncallModule {}
