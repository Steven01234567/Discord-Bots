/* eslint-disable brace-style */
const { SlashCommandBuilder, ChannelType } = require('discord.js');
const { joinVoiceChannel, getVoiceConnection, createAudioPlayer, createAudioResource, entersState, VoiceConnectionStatus, generateDependencyReport, /*, StreamType, NoSubscriberBehavior*/ } = require('@discordjs/voice');
// const { createReadStream } = require('node:fs');
const { join } = require('node:path');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('join')
		.setDescription('adds to voice channel')
		.addChannelOption(option =>
			option.setName('channel')
				.setDescription('Channel to join')
				.setRequired(true)
				.addChannelTypes(ChannelType.GuildVoice)),
	async execute(interaction) {
		// console.log(generateDependencyReport());
		const voiceChannel = interaction.options.getChannel('channel');
		const voiceConnection = joinVoiceChannel({
			channelId: voiceChannel.id,
			guildId: interaction.guildId,
			adapterCreator: interaction.guild.voiceAdapterCreator,
		});
		await interaction.reply('Hello! I have joined a voice channel!');

		// console.log(getVoiceConnection(voiceChannel.guildId));

		const connection = getVoiceConnection(interaction.guildId);
		const player = createAudioPlayer();
		// const summonSound = createAudioResource(join(__dirname, 'Annoy-o-Tron_Summon.mp3'));
		const summonSound = createAudioResource('C:\\Users\\steve\\Downloads\\discord-bot\\Annoy-o-Tron_Attack.mp3');
		try {
			await entersState(voiceConnection, VoiceConnectionStatus.Ready, 5000);
			console.log('Connected: ' + voiceChannel.guild.name);
		} catch (error) {
			console.log('Voice Connection not ready within 5s.', error);
			return null;
		}
		const subscription = voiceConnection.subscribe(player);
		player.play(summonSound);
		// console.log(summonSound);
		console.log('The audio player has started playing!');
		player.on('error', error => {
			console.error(`Error: ${error.message} with resource`);
		});
	},
};