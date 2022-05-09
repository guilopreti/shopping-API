import { Request, Response } from "express";
import { AppError, handleError } from "../errors/appError";
import createUserService from "../services/users/createUser.service";
import deleteUserService from "../services/users/deleteUser.service";
import listUsersService from "../services/users/listUsers.service";
import showUserService from "../services/users/showUser.service";
import updateUserService from "../services/users/updateUser.service";

class UsersController {
  async store(req: Request, res: Response) {
    const { name, email, password } = req.newUser;

    try {
      const newUser = await createUserService({ name, email, password });

      return res.status(201).json(newUser);
    } catch (err) {
      if (err instanceof AppError) {
        return handleError(err, res);
      }
    }
  }

  async index(req: Request, res: Response) {
    try {
      const usersList = await listUsersService();

      return res.json(usersList);
    } catch (err) {
      if (err instanceof AppError) {
        return handleError(err, res);
      }
    }
  }

  async show(req: Request, res: Response) {
    try {
      const email = req.userEmail;

      const user = await showUserService(email);

      return res.json(user);
    } catch (err) {
      if (err instanceof AppError) {
        return handleError(err, res);
      }
    }
  }

  async update(req: Request, res: Response) {
    try {
      const email = req.userEmail;

      const { password } = req.body;

      if (!password) {
        throw new AppError(400, "No password informed.");
      }

      await updateUserService(email, password);

      return res.status(201).json({ message: "Password updated!" });
    } catch (err) {
      if (err instanceof AppError) {
        return handleError(err, res);
      }
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const email = req.userEmail;

      await deleteUserService(email);

      return res.json({ message: "User deleted with sucess!" });
    } catch (err) {
      if (err instanceof AppError) {
        return handleError(err, res);
      }
    }
  }
}

export default UsersController;
