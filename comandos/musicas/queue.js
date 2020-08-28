const cfg = require("../config.json");
const Discord = require("discord.js");
const opus = require("opusscript");
const gyp = require("node-gyp");
const fs = require("fs");
const moment = require('moment');
const yt = require('ytdl-core');
const YouTube = require('simple-youtube-api');
const youtube = new YouTube('AIzaSyBArIz0QYJpLrwUhm7bMyWX4EXCnPZEeuQ');

exports.run = async (client, message, args, queue) => {
  const p = client.emojis.find(e => e.name === "play")
  const s = client.emojis.find(e => e.name === "stop")
  const pa = client.emojis.find(e => e.name === "pause")

  const args1 = message.content.split(' ');
  const searchString = args1.slice(1).join(' ');
  const url = args1[1] ? args1[1].replace(/<(.+)>/g, '$1') : '';
  const serverQueue = queue.get(message.guild.id);

  if (!serverQueue) return message.channel.send('Não há nada tocando! Adicione algumas músicas para tocar usando: !play [nome da música]');


  // serverQueue.songs.map(song => console.log(song))
  const queueInfo = new Discord.RichEmbed()
    .setTitle("Fila de músicas:", 'https://cdn.discordapp.com/emojis/465209209479495690.png?v=1')
    .setDescription(`${serverQueue.songs.map(song => `**•** ${song.title} por \`[${song.author}]\` `).slice(0, 16).join('\n')}`)
    .setFooter("Tocando agora: " + serverQueue.songs[0].title, message.author.avatarURL)
    .setColor(client.c.corpadrão)

  return message.channel.send({ embed: queueInfo });

  // > Functions

  async function handleVideo(video, message, voiceChannel, playlist = false) {
    const serverQueue = queue.get(message.guild.id);
    //   console.log(video);
    const song = {
      id: video.id,
      title: video.title,
      url: `https://www.youtube.com/watch?v=${video.id}`
    };
    if (!serverQueue) {
      const queueConstruct = {
        textChannel: message.channel,
        voiceChannel: voiceChannel,
        connection: null,
        skippers: [],

        songs: [],
        volume: 5,
        playing: true
      };
      queue.set(message.guild.id, queueConstruct);

      queueConstruct.songs.push(song);

      try {
        var connection = await voiceChannel.join();
        queueConstruct.connection = connection;
        play(message.guild, queueConstruct.songs[0]);
      } catch (error) {
        console.error(`Eu não pude entrar no canal de voz: ${error}`);
        queue.delete(message.guild.id);
        return message.channel.send(`Eu não pude entrar no canal de voz: ${error}`);
      }
    } else {
      serverQueue.songs.push(song);
      // console.log(serverQueue.songs);
      if (playlist) return undefined;
      else return message.channel.send(`${p} \`${song.title}\` foi adicionada na fila de músicas!`);
    }
    return undefined;
  }

  function play(guild, song) {
    const serverQueue = queue.get(guild.id);

    if (!song) {
      serverQueue.voiceChannel.leave();
      queue.delete(guild.id);
      return;
    }
    //   console.log(serverQueue.songs);

    const dispatcher = serverQueue.connection.playStream(yt(song.url))
      .on('end', reason => {
        if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
        else console.log("QUEUE " + reason);
        serverQueue.songs.shift();
        setTimeout(() => {
          play(guild, serverQueue.songs[0]);
        }, 250);
      })
      .on('error', error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

    serverQueue.textChannel.send(`${p} Começa a tocar: **${song.title}**`);
  }
}

exports.help = {
  name: "playlist",

}