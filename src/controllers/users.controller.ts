import { Request, Response } from "express";
import createUserService from "../services/users/createUser.service";
import listUsersService from "../services/users/listUsers.service";

class UsersController {
  store(req: Request, res: Response) {
    const { name, email } = req.body;

    try {
      const newUser = createUserService({ name, email });

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

  index(req: Request, res: Response) {
    try {
      const usersList = listUsersService();

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
}

export default UsersController;
