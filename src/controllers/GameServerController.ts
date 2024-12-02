import { Request, Response } from "express";
import { GameServerService } from "../services/GameServerService";

export class GameServerController {
    private static instance: GameServerController;
    private gameServerService: GameServerService;

    private constructor() {
        this.gameServerService = GameServerService.getInstance();
    }

    static getInstance(): GameServerController {
        if (!this.instance) {
            this.instance = new GameServerController();
        }

        return this.instance;
    }

    async verify(req: Request, res: Response) {
        if (!req.gameServer) {
            res.status(401).json({ error: "Invalid secret" });
            return;
        }

        res.status(200).json({
            verified: true,
            gameServer: {
                id: req.gameServer.id,
                name: req.gameServer.name,
                createdAt: req.gameServer.createdAt,
            },
        });
    }
}