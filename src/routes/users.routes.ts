import { Router } from "express";

import UsersController from "../controllers/users.controller";
import SessionController from "../controllers/sessions.controller";

import authUserMiddleware from "../middlewares/authUser.middleware";
import {
  userCreateSchema,
  validateUserCreateMdw,
} from "../middlewares/validateUserCreate.middleware";

const usersController = new UsersController();
const sessionController = new SessionController();

const router = Router();

router.post("", validateUserCreateMdw(userCreateSchema), usersController.store);
router.get("", authUserMiddleware, usersController.index);

router.get("/me", authUserMiddleware, usersController.show);
router.delete("/me", authUserMiddleware, usersController.delete);

router.patch("/me/updatePassword", authUserMiddleware, usersController.update);

router.post("/login", sessionController.store);

export default router;
