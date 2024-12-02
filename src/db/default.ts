import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export const defaultDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    logging: false,
    entities: [ __dirname + "/../entities/*{.ts,js}" ],
    synchronize: true,
    ssl: {
        rejectUnauthorized: false,
    },
});