const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const Money = require("../../money");
const config = require("../../config");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('takemoney')
        .setDescription('유저에게 돈을 차감합니다')
        .setDMPermission(false)
        .addUserOption(option => option.setDescription("차감할 유저").setName("user").setRequired(true))
        .addIntegerOption(option => option.setDescription("차감할 금액").setRequired(true).setName('amount'))
        .addBooleanOption(option => option.setRequired(false).setDescription("메시지를 공개적으로 표시할까요? (기본값: 공개)").setName("ep"))
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

    async execute(interaction) {
        let user = interaction.options.getUser("name");
        let amount = interaction.options.getInteger('amount');
        let left = Money.snowflake.takeMoney(user.id, amount);

        let embed = new EmbedBuilder()
            .setDescription(`${user.displayName}님의 ${amount}원을 차감했습니다`)
            .setTitle('차감 성공!')
            .setColor(config.color.info);

        if (amount >= 25000)
            embed.setFooter({ text: 'ㄷㄷㄷ' });
        else if (left == 0)
            embed.setFooter({ text: '거지를 만들다니 ㄷㄷ' });

        interaction.reply({ embeds: [embed] });
    }
};
