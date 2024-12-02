import express from "express";
import dotenv from "dotenv";
import { defaultDataSource } from "./db/default";
import DiscordBot from "./bot/index";

// Create Express app
const app = express();
app.use(express.json());

// Middleware
app.use(express.json());

// Routes
import GameServerRouter from "./routes/GameServerRoutes";

app.use("/api/gameserver", GameServerRouter);

// Loading

dotenv.config();

async function main() {
    try {
        // Initialize database first
        console.log(">> Connecting to database...");
        await defaultDataSource.initialize();
        console.log(">> Database connected");

        app.get("/", (req, res) => {
            res.send("Hello World");
        });

        // Start Express server
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`>> Server started on port ${port}`);
        });

        // Initialize Discord bot last
        console.log(">> Starting Discord bot...");
        await DiscordBot();
        console.log(">> Discord bot ready");

    } catch (error) {
        console.error("Failed to start application:", error);
        process.exit(1);
    }
}

// Run the application
main();

// Handle unhandled rejections
process.on("unhandledRejection", (error) => {
    console.error("Unhandled promise rejection:", error);
});

// Handle cleanup on shutdown
process.on("SIGTERM", () => {
    console.log("SIGTERM received. Shutting down gracefully...");
    // Add cleanup code here if needed
    process.exit(0);
});