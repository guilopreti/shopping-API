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
jest.setTimeout(15000);

describe("DELETE - /cart/:product_id", () => {
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

  test("Remove a product from one cart", async () => {
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

    const productName = "produto";
    const description = "Um produto de teste ai";
    const price = 8001.99;

    const productData = { name: productName, description, price };

    const createProduct = await request(app)
      .post("/products")
      .send(productData);

    const addCart = await request(app)
      .post("/cart")
      .set("Authorization", `Bearer ${login.body.token}`)
      .send({ product_id: createProduct.body.id });

    const response = await request(app)
      .delete(`/cart/${createProduct.body.id}`)
      .set("Authorization", `Bearer ${login.body.token}`);

    expect(response.status).toBe(200);
    expect(uuidSpy).toHaveBeenCalled();
    expect(response.body).toEqual(
      expect.objectContaining({
        id: "some-uuid",
        subtotal: 0,
        products: [],
      })
    );
  });
});
