const { SlashCommandBuilder, userMention } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('annoy')
		.setDescription('Annoys User')
		.addUserOption(option =>
			option.setName('target')
				.setDescription('The user to annoy')
		        .setRequired(true)),
	async execute(interaction) {
		const wait = require('node:timers/promises').setTimeout;
		const delay = 250;

		const target = interaction.options.getUser('target');

		await interaction.reply(userMention(target.id) + ' Hello!');
		await wait(delay);
		await interaction.followUp(userMention(target.id) + ' Hello!');
		await wait(delay);
		await interaction.followUp(userMention(target.id) + ' Hello!');
	},
};