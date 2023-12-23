const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const config = require("../../config");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('봇의 지연상태를 확인합니다'),

    async execute(interaction) {
        let embed = new EmbedBuilder()
            .setDescription("로딩중");

        const message = await interaction.reply({ embeds: [embed] });

        embed
            .setTitle("🏓 Pong!")
            .setDescription(null)
            .addFields(
                { name: "WS 핑", value: "```ini\n[ " + Math.round(interaction.client.ws.ping) + "ms ]```" },
                { name: "API 핑", value: "```ini\n[ " + Math.floor(message.createdTimestamp - interaction.createdTimestamp) + "ms ]```" }
            )
            .setColor(config.color.info)
            .setTimestamp();

        await interaction.editReply({ embeds: [embed] });
    },
};
