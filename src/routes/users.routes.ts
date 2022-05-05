import { Router } from "express";

import UsersController from "../controllers/users.controller";
import SessionController from "../controllers/sessions.controller";

const usersController = new UsersController();
const sessionController = new SessionController();

const router = Router();

router.post("", usersController.store);
router.get("", usersController.index);
router.get("/me", usersController.show);

router.post("/login", sessionController.store);

export default router;
