import { Request, Response } from "express";
import { AppError, handleError } from "../errors/appError";
import userLoginService from "../services/login/userLogin.service";

class SessionController {
  async store(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const token = await userLoginService({ email, password });

      return res.json({ token });
    } catch (err) {
      if (err instanceof AppError) {
        return handleError(err, res);
      }
    }
  }
}

export default SessionController;
