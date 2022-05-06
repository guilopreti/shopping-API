import * as express from "express";
import { IUserCreate } from "../../src/interfaces/users";

declare global {
  namespace Express {
    interface Request {
      userEmail: string;
      newUser: IUserCreate;
    }
  }
}
