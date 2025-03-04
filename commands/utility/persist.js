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
		const delay = 1000 / 2;

		const target = interaction.options.getUser('target');

		const looped_msg = userMention(target.id) + ' Hellooooo!';
		const end_msg = userMention(target.id) + ' Helloooo...';

		if (interaction.options.getBoolean('end')) {
			persistSwitch = false;
		}
		else {
			persistSwitch = true;

			await interaction.reply(looped_msg);
			await wait(delay);
			await target.send(looped_msg);
			await wait(delay);
			while (persistSwitch) {
		    	await interaction.followUp(looped_msg);
				await wait(delay);
				await target.send(looped_msg);
				await wait(delay);
			}
			await interaction.followUp(end_msg);
			await target.send(end_msg);
		}
	},
};