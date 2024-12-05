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

    async createGameServerSession(req: Request, res: Response) {
        if (!req.gameServer) {
            res.status(401).json({ error: "Invalid secret" });
            return;
        }

        const ip = req.ip;
        if (!ip) {
            res.status(400).json({ error: "Invalid IP address" });
            return;
        }

        try {
            const id = await this.gameServerService.createGameServerSession(req.gameServer.id, ip);

            res.status(201).json({ id });
        } catch (error) {
            res.status(400).json({ error: (error as Error)?.message || "Failed to create session" });
        }
    }

    async endGameServerSession(req: Request, res: Response) {
        if (!req.gameServer) {
            res.status(401).json({ error: "Invalid secret" });
            return;
        }

        const sessionId = req.params.id;
        if (!sessionId) {
            res.status(400).json({ error: "Invalid session ID" });
            return;
        }

        try {
            await this.gameServerService.endGameServerSession(sessionId);

            res.status(200).end();
        } catch (error) {
            res.status(400).json({ error: (error as Error)?.message || "Failed to end session" });
        }
    }

    async createPlayerSession(req: Request, res: Response) {
        if (!req.gameServer) {
            res.status(401).json({ error: "Invalid secret" });
            return;
        }

        const { ip, steamId } = req.body;
        if (!ip) {
            res.status(400).json({ error: "Invalid IP address" });
            return;
        }

        if (!steamId) {
            res.status(400).json({ error: "Invalid Steam ID" });
            return;
        }

        try {
            const id = await this.gameServerService.createPlayerSession(steamId, ip, req.gameServer);

            res.status(201).json({ id });
        } catch (error) {
            res.status(400).json({ error: (error as Error)?.message || "Failed to create session" });
        }
    }

    async endPlayerSession(req: Request, res: Response) {
        if (!req.gameServer) {
            res.status(401).json({ error: "Invalid secret" });
            return;
        }

        const sessionId = req.params.id;
        if (!sessionId) {
            res.status(400).json({ error: "Invalid session ID" });
            return;
        }

        try {
            await this.gameServerService.endPlayerSession(sessionId);

            res.status(200).end();
        } catch (error) {
            res.status(400).json({ error: (error as Error)?.message || "Failed to end session" });
        }
    }
}