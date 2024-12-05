import { Repository } from "typeorm";
import { User } from "../entities/UserEntity";
import { defaultDataSource } from "../db/default";
import { generatePUID } from "../utils/idGenerator";

export class UserService {
    private static instance: UserService;

    private userRepository: Repository<User>;

    private constructor() {}

    static getInstance(): UserService {
        if (!this.instance) {
            this.instance = new UserService();

            this.instance.userRepository = defaultDataSource.getRepository(User);
        }

        return this.instance;
    }

    async getUser(id: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }

    async getUserBySteamId(steamId: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { steamId } });
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }

    async createUser(steamId: string): Promise<User> {
        const id = generatePUID("user");
        const user = new User({ id, steamId });

        return this.userRepository.save(user);
    }
}