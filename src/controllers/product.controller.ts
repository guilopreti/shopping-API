import { Request, Response } from "express";
import { AppError, handleError } from "../errors/appError";
import { IProduct } from "../interfaces/product";
import createProductService from "../services/product/createProduct.service";
import listProductsService from "../services/product/listProducts.service";

class ProductController {
  async store(req: Request, res: Response) {
    try {
      const data = req.body;
      const product: IProduct = await createProductService(data);

      return res.status(201).json(product);
    } catch (err) {
      if (err instanceof AppError) {
        handleError(err, res);
      }
    }
  }

  async index(req: Request, res: Response) {
    const producList: IProduct[] = await listProductsService();

    return res.json(producList);
  }
}

export default ProductController;
