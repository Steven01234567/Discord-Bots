const { SlashCommandBuilder, userMention } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('persist')
		.setDescription('Persistently Annoys User')
		.addUserOption(option =>
			option.setName('target')
				.setDescription('The user to annoy')
		        .setRequired(true)),
	async execute(interaction) {
		const wait = require('node:timers/promises').setTimeout;
		const delay = 1000;

		const target = interaction.options.getUser('target');

		await interaction.reply(userMention(target.id) + ' Hellooooo!');
		while (true) {
			await wait(delay);
		    await interaction.followUp(userMention(target.id) + ' Hellooooo!');
		}
	},
};