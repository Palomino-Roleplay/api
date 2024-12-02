import { Request, Response, NextFunction } from "express";
import { GameServerService } from "../services/GameServerService";

import { GameServer } from "../entities/GameServerEntity";

declare module "express-serve-static-core" {
    interface Request {
        gameServer?: GameServer;
    }
}

export const GameServerAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const apiKey = req.headers["x-api-key"];

    if (!apiKey || typeof apiKey !== "string") {
        res.status(401).json({ error: "No API key provided" });
        return;
    }

    try {
        const gameServer = await GameServerService.getInstance().getGameServerBySecret(apiKey);
        req.gameServer = gameServer;

        next();
    } catch {
        res.status(401).json({ error: "Invalid secret" });
    }
};