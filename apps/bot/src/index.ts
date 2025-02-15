import { readdirSync } from 'fs';
import { join } from 'path';
import { Client, Collection, GatewayIntentBits } from 'discord.js';

import { type SlashCommand } from './types';

const { Guilds, MessageContent, GuildMessages, GuildMembers } = GatewayIntentBits;

// Initialize the Discord Client
const client = new Client({
  intents: [Guilds, MessageContent, GuildMessages, GuildMembers],
});

client.slashCommands = new Collection<string, SlashCommand>();
client.cooldowns = new Collection<string, number>();

const handlersDir = join(__dirname, './handlers');
readdirSync(handlersDir).forEach((handler) => {
  void require(`${handlersDir}/${handler}`)(client);
});

void client.login(process.env.DISCORD_BOT_TOKEN);
