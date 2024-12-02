import { Router } from "express";
import { GameServerController } from "../controllers/GameServerController";
import { GameServerAuthMiddleware } from "../middleware/AuthMiddleware";

const GameServerRouter = Router();
const controller = GameServerController.getInstance();

GameServerRouter.get("/verify", GameServerAuthMiddleware, controller.verify);

export default GameServerRouter;