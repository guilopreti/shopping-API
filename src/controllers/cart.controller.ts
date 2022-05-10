import { Request, Response } from "express";
import { AppError, handleError } from "../errors/appError";
import cartAddProdService from "../services/cart/cartAddProd.service";
import cartDelProdService from "../services/cart/cartDelProd.service";

class CartController {
  async addProduct(req: Request, res: Response) {
    try {
      const { userEmail } = req;

      const { product_id } = req.body;

      const cartAdd = await cartAddProdService(product_id, userEmail);

      res.json(cartAdd);
    } catch (err) {
      if (err instanceof AppError) {
        return handleError(err, res);
      }
    }
  }

  async delProduct(req: Request, res: Response) {
    try {
      const { userEmail } = req;

      const { product_id } = req.params;

      const cartDel = await cartDelProdService(userEmail, product_id);

      return res.json(cartDel);
    } catch (err) {
      if (err instanceof AppError) {
        return handleError(err, res);
      }
    }
  }
}

export default CartController;
