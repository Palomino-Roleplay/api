import { Discord, Slash, SlashOption } from "discordx";
import { ApplicationCommandOptionType, CommandInteraction } from "discord.js";
import { GameServerService } from "../../services/GameServerService";

@Discord()
export abstract class ServerCommands {
    private gameService = GameServerService.getInstance();

    @Slash({ name: "create-server", description: "Create a new game server" })
    async createServer(
        @SlashOption({
            name: "server-name",
            description: "Name of the server",
            required: true,
            type: ApplicationCommandOptionType.String,
        })
            serverName: string,
            interaction: CommandInteraction,
    ) {
        const server = await this.gameService.createGameServer(serverName);

        await interaction.reply({
            content: `Created server: ${serverName}.\nID: \`\`\`${server.id}\`\`\`\nKey: \`\`\`${server.secret}\`\`\`\n`,
            ephemeral: true,
        });
    }

    @Slash({ name: "delete-server", description: "Delete a game server" })
    async deleteServer(
        @SlashOption({
            name: "server-id",
            description: "ID of the server",
            required: true,
            type: ApplicationCommandOptionType.String,
        })
            serverId: string,
            interaction: CommandInteraction,
    ) {
        try {
            await this.gameService.deleteGameServer(serverId);
        } catch (error: Error | unknown) {
            await interaction.reply({
                content: `Error: ${(error as Error).message}`,
                ephemeral: true,
            });
            return;
        }

        await interaction.reply({
            content: `Server with ID \`${serverId}\` deleted.`,
            ephemeral: true,
        });
    }

    @Slash({ name: "list-servers", description: "List all game servers" })
    async listServers(interaction: CommandInteraction) {
        const servers = await this.gameService.getAllGameServers();

        const serverList = servers.map((server) => `${server.name} - ${server.id}`).join("\n");

        await interaction.reply({
            content: `Servers:\n\`\`\`${serverList}\`\`\``,
            ephemeral: true,
        });
    }
}