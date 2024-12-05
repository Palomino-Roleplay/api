import { Router } from "express";

import { PlayerAuthMiddleware } from "../middleware/AuthMiddleware";

const UserRouter = Router();

UserRouter.get("/verify", PlayerAuthMiddleware, (req, res) => {
    if (!req.user) {
        res.status(401).json({ error: "Invalid session token" });
        return;
    }

    const user = req.user;

    res.status(200).json({
        verified: true,
        user: {
            id: user.id,
            createdAt: user.createdAt,
            steamId: user.steamId,
            discordId: user.discordId,
        },
    });
});

export default UserRouter;