exports.run = async (client, message, args) => {
    message.delete()
    if (!message.member.hasPermission("PRIORITY_SPEAKER")) return message.reply('você não possui permissão para executar este comando.').then(msg => msg.delete(8000))
    let mensagem = args[0]
    if (!mensagem) return message.reply("Para divulgar um video, é necessário que você insira o link do video no comando.").then(msg => msg.delete(8000))
    if (!mensagem.startsWith("https://")) return message.channel.send(`${message.author}, é necessário que o link comece com \`https:\``)
    const Discord = require('discord.js')

    const c = require('../config.json')

    const emj = client.emojis.find(e => e.name === "sino")
    const embed = new Discord.RichEmbed()
        .setAuthor("Harmony - Divulgação", client.user.avatarURL)
        .setDescription(`O youtuber ${message.author} acaba de postar um vídeo em nosso servidor. ${emj}
Para acessar o vídeo, basta [clicar aqui](${mensagem}).

**Não se esqueça de deixar o like para apoiar nossos parceiros!**`)
        .setFooter(message.author.tag, message.author.avatarURL)
        .setThumbnail(client.user.avatarURL)
        .setTimestamp()
        .setColor(c.corpadrão)

    client.channels.get('605845909246574603').send(embed)
}

exports.help = {
    name: "divulgar",
    aliases: [
        "youtuber",
        "div"
    ]
}