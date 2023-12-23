const { Client, GatewayIntentBits, Events } = require("discord.js");
const config = require("./config");
const fs = require("fs");
const path = require("path");

// Registering Commands
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const commands = new Map(); //<Command's name, execute Function>

const cmdFolder = path.join(__dirname, 'commands');
for (const cmdpath of fs.readdirSync(cmdFolder)) {
    const data = path.join(cmdFolder, cmdpath);

    if (fs.statSync(data).isFile()) {
        const command = require(data);

        if ('data' in command && 'execute' in command) {
            if ('alias' in command) {
                const alias = command.alias;
                alias.forEach(element => {
                    commands.set(element, command.execute);
                });
            }

            commands.set(command.data.name, command.execute);
        }
    }
}

client.once(Events.ClientReady, (readyClient) => {
    console.log(`${readyClient.user.tag}로 로그인에 성공했습니다`);
});

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const commandName = interaction.commandName.toLowerCase();
    const command = commands.get(commandName);

    if (!command) {
        console.error(`[FATAL] ${commandName}을 찾을 수 없습니다. 커맨드 등록 해제가 필요합니다`);
        return;
    }

    try {
        await command(interaction);
    } catch (error) {
        console.error(error);

        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
        } else {
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
});

client.login(config.token);
