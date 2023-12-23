
const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const Money = require("../../money");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('givemoney')
        .setDescription('유저에게 돈을 지급합니다')
        .setDMPermission(false)
        .addUserOption(option => option.setDescription("지급할 유저").setName("user").setRequired(true))
        .addIntegerOption(option => option.setDescription("지급할 금액").setRequired(true).setName('amount'))
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

    async execute(interaction) {
        let user = interaction.options.getUser("user");
        let amount = interaction.options.getInteger('amount');

        Money.snowflake.giveMoney(user.id, amount);

        let embed = new EmbedBuilder()
            .setDescription(`${user.displayName}님에게 ${amount}원을 지급했습니다`)
            .setTitle('지급 성공!');

        if (amount >= 50000)
            embed.setFooter({ text: '저도 조금만ㅇ' });

        interaction.reply({ embeds: [embed] });
    }
};
