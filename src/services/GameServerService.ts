import { Repository } from "typeorm";
import { GameServer } from "../entities/GameServerEntity";
import { GameServerSession } from "../entities/GameServerSessionEntity";
import { PlayerSession } from "../entities/PlayerSessionEntity";
import crypto from "crypto";
import { generatePUID } from "../utils/idGenerator";
import { defaultDataSource } from "../db/default";
import { UserService } from "./UserService";
import { User } from "../entities/UserEntity";
import { IsNull } from "typeorm";

export class GameServerService {
    private static instance: GameServerService;

    private gameServerRepository: Repository<GameServer>;
    private gameServerSessionRepository: Repository<GameServerSession>;
    private playerSessionRepository: Repository<PlayerSession>;

    private constructor() {}

    static getInstance(): GameServerService {
        if (!this.instance) {
            this.instance = new GameServerService();

            this.instance.gameServerRepository = defaultDataSource.getRepository(GameServer);
            this.instance.gameServerSessionRepository = defaultDataSource.getRepository(GameServerSession);
            this.instance.playerSessionRepository = defaultDataSource.getRepository(PlayerSession);
        }

        return this.instance;
    }

    async createGameServer(name: string): Promise<GameServer> {
        const id = generatePUID("gmsv");
        const secret = crypto.randomBytes(32).toString("hex");

        const gameServer = new GameServer({ id: id, name: name, secret: secret });

        return this.gameServerRepository.save(gameServer);
    }

    async deleteGameServer(id: string): Promise<void> {
        const server = await this.getGameServer(id);

        await this.gameServerRepository.remove(server);
    }

    async getGameServer(id: string): Promise<GameServer> {
        const server = await this.gameServerRepository.findOne({ where: { id } });
        if (!server) {
            throw new Error("GameServer not found");
        }
        return server;
    }

    async getGameServerBySecret(secret: string): Promise<GameServer> {
        const server = await this.gameServerRepository.findOne({ where: { secret } });
        if (!server) {
            throw new Error("Invalid secret");
        }
        return server;
    }

    async getAllGameServers(): Promise<GameServer[]> {
        return this.gameServerRepository.find();
    }

    // GameServerSessions

    async createGameServerSession(gameServerId: string, ip: string): Promise<string> {
        const id = generatePUID("gmsv_sesn", 64);

        const session = new GameServerSession({ id, gameServerId, ip });

        await session.save();

        return id;
    }

    async getGameServerSession(id: string): Promise<GameServerSession> {
        const session = await this.gameServerSessionRepository.findOne({ where: { id } });
        if (!session) {
            throw new Error("GameServerSession not found");
        }

        if (session.endedAt) {
            throw new Error("GameServerSession has ended");
        }

        return session;
    }

    async endGameServerSession(id: string): Promise<void> {
        const session = await this.getGameServerSession(id);
        session.endedAt = new Date();

        await this.gameServerSessionRepository.save(session);
    }

    async getActiveGameServerSession(gameServerId: string): Promise<GameServerSession | null> {
        const session = await this.gameServerSessionRepository.findOne({
            where: {
                gameServerId,
                endedAt: IsNull(),
            },
            order: {
                createdAt: "DESC",
            },
        });

        return session;
    }


    // PlayerSessions

    async createPlayerSession(steamId: string, ip: string, gameServer: GameServer): Promise<string> {
        const gameServerId = gameServer.id;
        const gameServerSession = await this.getActiveGameServerSession(gameServerId);

        if (!gameServerSession) {
            throw new Error("No active GameServerSession");
        }

        const id = generatePUID("gmcl_sesn", 64);

        let user: User;

        try {
            user = await UserService.getInstance().getUserBySteamId(steamId);
        } catch {
            user = await UserService.getInstance().createUser(steamId);
        }

        const session = new PlayerSession({ id, userId: user.id, ip, gameServerId, gameServerSessionId: gameServerSession.id });

        await session.save();

        return id;
    }

    async getPlayerSession(id: string): Promise<PlayerSession> {
        const session = await this.playerSessionRepository.findOne({ where: { id } });
        if (!session) {
            throw new Error("PlayerSession not found");
        }

        if (session.endedAt) {
            throw new Error("PlayerSession has ended");
        }

        return session;
    }

    async getUserByPlayerSession(id: string): Promise<User> {
        const session = await this.getPlayerSession(id);

        return UserService.getInstance().getUser(session.userId);
    }

    async endPlayerSession(id: string): Promise<void> {
        const session = await this.getPlayerSession(id);
        session.endedAt = new Date();

        await this.playerSessionRepository.save(session);
    }
}