import { Router } from "express";

import CartController from "../controllers/cart.controller";

import authUserMiddleware from "../middlewares/authUser.middleware";

const cartController = new CartController();

const router = Router();

router.post("", authUserMiddleware, cartController.addProduct);
router.delete("/:product_id", authUserMiddleware, cartController.delProduct);

export default router;
