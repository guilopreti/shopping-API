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

jest.mock("uuid");
jest.setTimeout(10000);

describe(" POST - /products/ ", () => {
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

  test(" Should create an Product ", async () => {
    const name = "produto";
    const description = "Um produto de teste ai";
    const price = 8001.99;

    const uuidSpy = jest.spyOn(uuid, "v4");
    uuidSpy.mockReturnValue("some-uuid");

    const userData = { name, description, price };

    const response = await request(app).post("/products").send(userData);

    expect(response.status).toBe(201);

    expect(uuidSpy).toHaveBeenCalled();

    expect(response.body).toEqual(
      expect.objectContaining({
        id: "some-uuid",
        name: "produto",
        description: "Um produto de teste ai",
        price: 8001.99,
      })
    );
  });
});
