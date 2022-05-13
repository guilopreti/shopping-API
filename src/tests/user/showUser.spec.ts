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
import * as uuid from "uuid";
import * as bcrypt from "bcrypt";

jest.mock("uuid");

jest.setTimeout(10000);

describe("GET - /users/me", () => {
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

  test("Should list the loged users", async () => {
    const name = "name";
    const email = "email@mail.com";
    const password = "123456";

    const uuidSpy = jest.spyOn(uuid, "v4");
    uuidSpy.mockReturnValue("some-uuid");

    const userData = { name, email, password };

    await request(app).post("/users").send(userData);

    const login = await request(app)
      .post("/users/login")
      .send({ email, password });

    const response = await request(app)
      .get("/users/me")
      .set("Authorization", `Bearer ${login.body.token}`);

    expect(response.status).toBe(200);

    expect(uuidSpy).toHaveBeenCalled();

    expect(response.body).toEqual(
      expect.objectContaining({
        id: "some-uuid",
        name: "name",
        email: "email@mail.com",
      })
    );
    expect(bcrypt.compareSync(password, response.body.password)).toBeTruthy();

    expect(response.body.cart).toEqual(
      expect.objectContaining({
        id: "some-uuid",
        subtotal: 0,
      })
    );

    expect(response.body.buys).toHaveLength(0);
  });
});
