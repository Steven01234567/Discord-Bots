const { SlashCommandBuilder, ChannelType, generateDependencyReport } = require('discord.js');
const { joinVoiceChannel, /*getVoiceConnection,*/ createAudioPlayer, createAudioResource /*, StreamType, NoSubscriberBehavior*/ } = require('@discordjs/voice');
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
		const voiceChannel = interaction.options.getChannel('channel');
		const voiceConnection = joinVoiceChannel({
			channelId: voiceChannel.id,
			guildId: interaction.guildId,
			adapterCreator: interaction.guild.voiceAdapterCreator,
		});
		await interaction.reply('Hello! I have joined a voice channel!');

		// console.log(getVoiceConnection(voiceChannel.guildId));

		const player = createAudioPlayer();
		const summonSound = createAudioResource(join(__dirname, 'Annoy-o-Tron_Summon.mp3'));
		player.play(summonSound);
		const subscription = voiceConnection.subscribe(player);
		// console.log(summonSound);
		console.log(generateDependencyReport());
		console.log('The audio player has started playing!');
	},
};