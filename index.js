//Requirements
const Discord = require("../../node_modules/discord.js")
const { REST, Routes, GatewayIntentBits } = require('../../node_modules/discord.js');
const Client = new Discord.Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]});
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
var connection
var player
var subscription
var resource
const prefix = "!"

Client.once("ready", () => {
    console.log("bot ready")
});

Client.on("messageCreate", message => {
            if(message.content == prefix + "jouer"){
                if(message.member.voice.channel != null){
                    connection = joinVoiceChannel({
                        channelId: message.member.voice.channel.id,
                        guildId: message.guild.id,
                        adapterCreator: message.guild.voiceAdapterCreator,
                    });
                    player = createAudioPlayer();
                    subscription = connection.subscribe(player);
                    resource = createAudioResource("http://103.252.90.82:8000/radio.mp3");
                    player.play(resource);
                    const embed = new Discord.EmbedBuilder()
                        .setColor("Yellow")
                        .setDescription("Joue maintenant dans <#" + message.member.voice.channel.id + ">.")
                    message.channel.send({ embeds: [embed] })
                }
                else {
                    const embed = new Discord.EmbedBuilder()
                        .setColor("Red")
                        .setDescription("Tu n'est pas connecté dans un salon vocal.")
                        message.channel.send({ embeds: [embed] })
                }
            }
            if(message.content == prefix + "stop"){
                if(player == undefined || connection == undefined){
                    const embed = new Discord.EmbedBuilder()
                        .setColor("Red")
                        .setDescription("Je ne suis pas en train de jouer !")
                        message.channel.send({ embeds: [embed] })
                }
                else {
                    player.stop()
                    connection.destroy();
                    const embed = new Discord.EmbedBuilder()
                        .setColor("Yellow")
                        .setDescription("Arrêté et déconnecté.")
                        message.channel.send({ embeds: [embed] })  
                }
                
            }
            if(message.content == prefix + "pause"){
                if(player == undefined){
                    const embed = new Discord.EmbedBuilder()
                        .setColor("Red")
                        .setDescription("Je ne suis pas en train de jouer !")
                        message.channel.send({ embeds: [embed] })
                }
                else {
                    player.pause()
                    const embed = new Discord.EmbedBuilder()
                        .setColor("Yellow")
                        .setDescription("En pause.")
                        message.channel.send({ embeds: [embed] })     
                }
            }
            if(message.content == prefix + "lecture"){
                if(player == undefined){
                    const embed = new Discord.EmbedBuilder()
                        .setColor("Red")
                        .setDescription("Je ne suis pas en train de jouer !")
                        message.channel.send({ embeds: [embed] })
                }
                else {
                    player.unpause()
                    const embed = new Discord.EmbedBuilder()
                        .setColor("Yellow")
                        .setDescription("Repris.")
                        message.channel.send({ embeds: [embed] })  
                }
            }
});

Client.login("MTExMjQ4OTc5NzA2ODUyOTc0Ng.GYnGk_.3FkPi16Afbz5GR93cWNuXIzoZfPS6V9r0MaWQA")