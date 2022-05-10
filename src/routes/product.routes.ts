import { Router } from "express";

import ProductController from "../controllers/product.controller";

const productController = new ProductController();

const router = Router();

router.get("", productController.index);
router.post("", productController.store);

export default router;
