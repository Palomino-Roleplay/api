import { Discord, Slash } from "discordx";
import { CommandInteraction } from "discord.js";

@Discord()
export abstract class TestCommands {
    @Slash({ name: "ping", description: "Ping the bot" })
    async ping(interaction: CommandInteraction) {
        await interaction.reply("Pong!");
    }
}