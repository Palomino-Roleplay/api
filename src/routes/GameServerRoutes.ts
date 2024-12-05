import { Router } from "express";
import { GameServerController } from "../controllers/GameServerController";
import { GameServerAuthMiddleware } from "../middleware/AuthMiddleware";

const GameServerRouter = Router();
const controller = GameServerController.getInstance();

GameServerRouter.get("/verify", GameServerAuthMiddleware, (req, res) => controller.verify(req, res));

GameServerRouter.post("/sessions/gameserver", GameServerAuthMiddleware, (req, res) => {
    controller.createGameServerSession(req, res);
});

GameServerRouter.delete("/sessions/gameserver/:id", GameServerAuthMiddleware, (req, res) => {
    controller.endGameServerSession(req, res);
});

GameServerRouter.post("/sessions/player", GameServerAuthMiddleware, (req, res) => {
    controller.createPlayerSession(req, res);
});

GameServerRouter.delete("/sessions/player/:id", GameServerAuthMiddleware, (req, res) => {
    controller.endPlayerSession(req, res);
});

export default GameServerRouter;