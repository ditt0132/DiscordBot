"use strict";
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const config = require("../../config");
const Money = require("../../money");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('money')
        .setDescription('잔액을 확인합니다')
        .addUserOption(option => option.setName("user").setDescription("잔액을 확인할 유저")),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor(config.color.info)
            .setTitle(`잔액 조회 중...`);

        let money = Money.getMoney(interaction.member);

        if (money <= 0)
            embed.setDescription("0원! ||~~가난한 나락에 떨어져 있어요~~||");
        else if (money >= 1000)
            embed.setDescription(`${money}원! ||아무래도 꽤 있네요||`);
        else if (money >= 10000)
            embed.setDescription(`${money}원! ||부자가 되어 가고 있어요||`);
        else if (money >= 50000)
            embed.setDescription(`${money}원!\n||5만원 넘게 되면 어떤 특별한 이벤트가 기다리고 있을까요?||`);
        else
            embed.setDescription(`${money}원!`);

        interaction.reply({ embeds: [embed] });
    }
};
