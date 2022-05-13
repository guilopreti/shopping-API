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

describe(" POST - /users/ ", () => {
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

  test(" Should create an User and its Cart ", async () => {
    const name = "name";
    const email = "email@mail.com";
    const password = "123456";

    const uuidSpy = jest.spyOn(uuid, "v4");
    uuidSpy.mockReturnValue("some-uuid");

    const userData = { name, email, password };

    const response = await request(app).post("/users").send(userData);

    expect(response.status).toBe(201);

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
  });
});
