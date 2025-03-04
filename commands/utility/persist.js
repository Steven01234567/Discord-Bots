let persistSwitch = false;
const { SlashCommandBuilder, userMention } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('persist')
		.setDescription('Persistently Annoys User')
		.addUserOption(option =>
			option.setName('target')
				.setDescription('The user to annoy')
		        .setRequired(false))
		.addBooleanOption(option =>
			option.setName('end')
				.setDescription('Ends persist')
				.setRequired(false)),
	async execute(interaction) {
		const wait = require('node:timers/promises').setTimeout;
		const delay = 1000;

		const target = interaction.options.getUser('target');

		if (interaction.options.getBoolean('end')) {
			persistSwitch = false;
		}
		else {
			persistSwitch = true;

			await interaction.reply(userMention(target.id) + ' Hellooooo!');
			while (persistSwitch) {
				await wait(delay);
		    	await interaction.followUp(userMention(target.id) + ' Hellooooo!');
			}
			await interaction.followUp(userMention(target.id) + ' Helloooo...');
		}
	},
};