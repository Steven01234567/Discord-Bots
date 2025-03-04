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
		const delay = 250 / 2;

		const target = interaction.options.getUser('target');

		const msg = userMention(target.id) + ' Hello!';
		await interaction.reply(msg);
		await wait(delay);
		await target.send(msg);
		await wait(delay);
		for (let i = 0; i < 2; i++) {
			await interaction.followUp(msg);
			await wait(delay);
			await target.send(msg);
			await wait(delay);
		}
	},
};