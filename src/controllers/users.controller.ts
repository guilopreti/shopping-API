import { Request, Response } from "express";
import createUserService from "../services/users/createUser.service";
import listUsersService from "../services/users/listUsers.service";
import showUserService from "../services/users/showUser.service";

class UsersController {
  async store(req: Request, res: Response) {
    const { name, email, password } = req.body;

    try {
      const newUser = await createUserService({ name, email, password });

      return res.status(201).json(newUser);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).send({
          error: err.name,
          message: err.message,
        });
      }
    }
  }

  async index(req: Request, res: Response) {
    try {
      const usersList = await listUsersService();

      return res.json(usersList);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).send({
          error: err.name,
          message: err.message,
        });
      }
    }
  }

  async show(req: Request, res: Response) {
    try {
      const user = await showUserService({
        authorization: req.headers.authorization,
      });

      return res.json(user);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(401).send({
          error: err.name,
          message: err.message,
        });
      }
    }
  }
}

export default UsersController;
