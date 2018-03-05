import * as express from "express";
import * as request from "supertest";
import { Test } from "@nestjs/testing";
import { OncallModule } from "../../src/oncall/oncall.module";
import { OncallService } from "../../src/oncall/oncall.service";
import { INestApplication } from "@nestjs/common";

describe("Oncall", () => {
  let server;
  let app: INestApplication;

  const oncallService = { findAll: () => ["test"] };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [OncallModule],
    })
      .overrideComponent(OncallService)
      .useValue(oncallService)
      .compile();

    server = express();
    app = module.createNestApplication(server);
    await app.init();
  });

  it(`/GET oncall`, () => {
    return request(server)
      .get("/oncall")
      .expect(200)
      .expect({
        data: oncallService.findAll(),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});