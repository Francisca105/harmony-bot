exports.run = async (client, message, args) => {
    const Discord = require('discord.js')
    const c = require('../config.json')
    client.Database.Users.findOne({ "_id": message.author.id }, function (erro, documento) {
        if (documento) {
            const embed = new Discord.RichEmbed()
                .setDescription(`${message.author}, aqui está as informações do seu level!`)
                .addField("Informações do seu rank.", `
XP: ${documento.xp}
Lvl. ${documento.level}`)
                .setFooter(message.author.tag, client.user.avatarURL)
                .setThumbnail(message.author.avatarURL)
                .setTimestamp()
                .setColor(c.corpadrão)
            message.channel.send(embed)
        }
    })
}

exports.help = {
    name: "xp",
    aliases: [
        "rank",
        "level"
    ]
}