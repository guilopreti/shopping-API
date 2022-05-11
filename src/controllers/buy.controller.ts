import { Request, Response } from "express";
import { AppError, handleError } from "../errors/appError";
import createBuyService from "../services/buy/createBuy.service";

class BuyController {
  async store(req: Request, res: Response) {
    try {
      const { userEmail } = req;

      const buy = await createBuyService(userEmail);

      return res.status(201).json(buy);
    } catch (err) {
      if (err instanceof AppError) {
        return handleError(err, res);
      }
    }
  }
}

export default BuyController;
