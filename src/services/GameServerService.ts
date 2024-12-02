import { Repository } from "typeorm";
import { GameServer } from "../entities/GameServerEntity";
import crypto from "crypto";
import { generatePUID } from "../utils/idGenerator";
import { defaultDataSource } from "../db/default";

export class GameServerService {
    private static instance: GameServerService;
    private repository: Repository<GameServer>;

    private constructor() {}

    static getInstance(): GameServerService {
        if (!this.instance) {
            this.instance = new GameServerService();
            this.instance.repository = defaultDataSource.getRepository(GameServer);
        }

        return this.instance;
    }

    async createGameServer(name: string): Promise<GameServer> {
        const id = generatePUID("gmsv");
        const secret = crypto.randomBytes(32).toString("hex");

        const gameServer = new GameServer({ id: id, name: name, secret: secret });

        return this.repository.save(gameServer);
    }

    async deleteGameServer(id: string): Promise<void> {
        const server = await this.getGameServer(id);

        await this.repository.remove(server);
    }

    async getGameServer(id: string): Promise<GameServer> {
        const server = await this.repository.findOne({ where: { id } });
        if (!server) {
            throw new Error("GameServer not found");
        }
        return server;
    }

    async getGameServerBySecret(secret: string): Promise<GameServer> {
        const server = await this.repository.findOne({ where: { secret } });
        if (!server) {
            throw new Error("Invalid secret");
        }
        return server;
    }

    async getAllGameServers(): Promise<GameServer[]> {
        return this.repository.find();
    }
}