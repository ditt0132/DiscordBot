import { CommandInteraction, EmbedBuilder, GuildMember, PermissionFlagsBits, SlashCommandBuilder, User } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('������ �����մϴ�')
        .addUserOption(option => option.setName("user").setDescription("������ ����").setRequired(true))
        .addStringOption(option => option.setName("reason").setDescription("�����ϴ� ����"))
        .setDMPermission(false),
    async execute(interaction: CommandInteraction) {
        if (!interaction.member?.permissions.has([PermissionFlagsBits.BanMembers])) return
        const userOption = interaction.options.getUser("user")
        const userToBan = interaction.guild?.members.resolve(userOption);
        if (userToBan) {
            await userToBan.ban({ reason: interaction.options.getString("reason") });
            interaction.reply({
                embeds: [new EmbedBuilder()
                    .setTitle("������ �����߽��ϴ�")
                    .setColor("#ffa200")
                    .setFooter({ iconURL: interaction.user.displayAvatarURL(), text: `ó����: ${interaction.user.displayName}` })
                ]})
        } else {
            interaction.reply({ content: "[ERR] �ش� ������ ã�� �� �����ϴ�.", ephemeral: true });
        }
    }
};
