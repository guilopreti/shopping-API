import { Router } from "express";

import BuyController from "../controllers/buy.controller";

import authUserMiddleware from "../middlewares/authUser.middleware";

const buyController = new BuyController();

const router = Router();

router.post("", authUserMiddleware, buyController.store);

export default router;
