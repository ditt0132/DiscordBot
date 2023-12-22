import { CommandInteraction, EmbedBuilder, GuildMember, SlashCommandBuilder } from "discord.js";
import config from "../config"
import moneyutil from "../money"

module.exports = {
    data: new SlashCommandBuilder()
        .setName('money')
        .setDescription('현재 돈을 출력합니다')
        .addUserOption(option => option.setName("user").setDescription("돈을 출력할 유저")),
    async execute(interaction: CommandInteraction) {
        const embed = new EmbedBuilder()
            .setColor(config.color.info)
            .setTitle(`현재 ${interaction.user.displayName}님의 돈은...`)
        let money = moneyutil.getMoney(interaction.member as GuildMember)
        if (money <= 0) embed.setDescription("0원! ||~~거지가 되신걸 축하드려요~~||")
        else if (money >= 1000) embed.setDescription(`${money}원! ||천원만 주세요||`)
        else if (money >= 10000) embed.setDescription(`${money}원! ||ㄷㄷㄷ 좀만 주세요||`)
        else if (money >= 50000) embed.setDescription(`${money}원!\n||5만원이나 있으니까 만원 정도는 주실 수 있죠?||`)
        else embed.setDescription(`${money}원!`)
    }
};
