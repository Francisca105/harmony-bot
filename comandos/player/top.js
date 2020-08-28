exports.run = async (client, message, args) => {
    // client.Database.Users.find({}).sort("-xp").then(docs => console.log(docs.map(a => `${client.users.get(a._id).username} -  ${a.xp} \n`)))
    client.Database.Users.find({}).sort("-xp").then(docs => {
        const c = require('../config.json')
        const Discord = require('discord.js')
        const embed = new Discord.RichEmbed()
            .setAuthor("LISTA DOS 5 JOGADORES COM MAIS XP", client.user.avatarURL)
            .setDescription(` \n**1º** <@${docs[0]._id}> - lvl. ${docs[0].level} - ${docs[0].xp}xp
**2º** <@${docs[1]._id}> - lvl. ${docs[1].level} - ${docs[1].xp}xp
**3º** <@${docs[2]._id}> - lvl. ${docs[2].level} - ${docs[2].xp}xp
**4º** <@${docs[3]._id}> - lvl. ${docs[3].level} - ${docs[3].xp}xp
**5º** <@${docs[4]._id}> - lvl. ${docs[4].level} - ${docs[4].xp}xp`)
        message.channel.send(embed)

    })
}

exports.help = {
    name: "top",
    aliases: [
        "toprank",
        "ranktop"

    ]
}