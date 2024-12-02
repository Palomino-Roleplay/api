import { Client } from "discordx";
import { IntentsBitField, Partials, PermissionsBitField } from "discord.js";
import dotenv from "dotenv";

import "./commands/TestCommands";
import "./commands/ServerCommands";

dotenv.config();

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMembers,
    ],
    partials: [ Partials.Channel, Partials.Message ],
    silent: false,
    botGuilds: [ process.env.DISCORD_DEV_GUILD as string ],
});

client.on("ready", async () => {
    console.log(">> Bot started");

    // to create/update/delete discord application commands
    await client.initApplicationCommands();
});

client.on("interactionCreate", async (interaction) => {
    if (interaction.isCommand()) {
        if (!interaction.memberPermissions || !interaction.memberPermissions.has(PermissionsBitField.Flags.Administrator)) {
            await interaction.reply("Refer to rule 3.");
            return;
        }
    }

    await client.executeInteraction(interaction);
});

function DiscordBot() {
    client.login(process.env.DISCORD_TOKEN as string);
}

export default DiscordBot;