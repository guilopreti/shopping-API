import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";
import request from "supertest";
import app from "../../app";

import {
  jest,
  describe,
  beforeAll,
  afterAll,
  test,
  expect,
} from "@jest/globals";

jest.setTimeout(10000);

describe("PATCH - /users/me/updatePassword", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Should update the password of the loged user", async () => {
    const name = "name";
    const email = "email@mail.com";
    const password = "123456";

    const userData = { name, email, password };

    await request(app).post("/users").send(userData);

    const login = await request(app)
      .post("/users/login")
      .send({ email, password });

    const response = await request(app)
      .patch("/users/me/updatePassword")
      .set("Authorization", `Bearer ${login.body.token}`)
      .send({ password: "bacalhau" });

    expect(response.status).toBe(201);
    expect(response.body.message).toEqual("Password updated!");
  });
});
