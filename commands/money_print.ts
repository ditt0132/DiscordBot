import { CommandInteraction, EmbedBuilder, GuildMember, SlashCommandBuilder } from "discord.js";
import config from "../config"
import moneyutil from "../money"

module.exports = {
    data: new SlashCommandBuilder()
        .setName('money')
        .setDescription('���� ���� ����մϴ�')
        .addUserOption(option => option.setName("user").setDescription("���� ����� ����")),
    async execute(interaction: CommandInteraction) {
        const embed = new EmbedBuilder()
            .setColor(config.color.info)
            .setTitle(`���� ${interaction.user.displayName}���� ����...`)
        let money = moneyutil.getMoney(interaction.member as GuildMember)
        if (money <= 0) embed.setDescription("0��! ||~~������ �ǽŰ� ���ϵ����~~||")
        else if (money >= 1000) embed.setDescription(`${money}��! ||õ���� �ּ���||`)
        else if (money >= 10000) embed.setDescription(`${money}��! ||������ ���� �ּ���||`)
        else if (money >= 50000) embed.setDescription(`${money}��!\n||5�����̳� �����ϱ� ���� ������ �ֽ� �� ����?||`)
        else embed.setDescription(`${money}��!`)
    }
};
