import { CommandInteraction, EmbedBuilder, GuildMember, PermissionFlagsBits, SlashCommandBuilder, User } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('유저를 차단합니다')
        .addUserOption(option => option.setName("user").setDescription("차단할 유저").setRequired(true))
        .addStringOption(option => option.setName("reason").setDescription("차단하는 이유"))
        .setDMPermission(false),
    async execute(interaction: CommandInteraction) {
        if (!interaction.member?.permissions.has([PermissionFlagsBits.BanMembers])) return
        const userOption = interaction.options.getUser("user")
        const userToBan = interaction.guild?.members.resolve(userOption);
        if (userToBan) {
            await userToBan.ban({ reason: interaction.options.getString("reason") });
            interaction.reply({
                embeds: [new EmbedBuilder()
                    .setTitle("유저를 차단했습니다")
                    .setColor("#ffa200")
                    .setFooter({ iconURL: interaction.user.displayAvatarURL(), text: `처리자: ${interaction.user.displayName}` })
                ]})
        } else {
            interaction.reply({ content: "[ERR] 해당 유저를 찾을 수 없습니다.", ephemeral: true });
        }
    }
};
