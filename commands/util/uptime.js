const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const config = require("../../config");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('uptime')
        .setDescription('봇의 업타임을 확인합니다'),

    async execute(interaction) {
        let uptime = interaction.client.uptime;
        let embed = new EmbedBuilder()
            .setColor(config.color.info)
            .setTitle(formatUptime(uptime))
            .setDescription("동안 ||노동|| 중이에요!");

        await interaction.reply({ embeds: [embed] });
    }
};

function formatUptime(uptimeInMilliseconds) {
    const millisecondsInSecond = 1000;
    const secondsInMinute = 60;
    const minutesInHour = 60;
    const hoursInDay = 24;

    const totalSeconds = uptimeInMilliseconds / millisecondsInSecond;
    const days = Math.floor(totalSeconds / (secondsInMinute * minutesInHour * hoursInDay));
    const hours = Math.floor((totalSeconds % (secondsInMinute * minutesInHour * hoursInDay)) / (secondsInMinute * minutesInHour));
    const minutes = Math.floor((totalSeconds % (secondsInMinute * minutesInHour)) / secondsInMinute);
    const seconds = Math.floor(totalSeconds % secondsInMinute);

    if (days > 0) {
        return `${days}일 ${hours}시간 ${minutes}분 ${seconds}분`;
    } else if (hours > 0) {
        return `${hours}시간 ${minutes}분 ${seconds}초`;
    } else if (minutes > 0) {
        return `${minutes}분 ${seconds}초`;
    } else {
        return `${seconds}초`;
    }
}
