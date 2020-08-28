exports.run = (client, message, args) => {
    const Discord = require('discord.js')
    const c = require('../config.json')
    const emoji = client.emojis.find(e => e.name === "success")
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return;

    const f1 = new Discord.RichEmbed()
        .setDescription(`${message.author}, deseja mesmo fechar esse canal?`)
        .setTimestamp()

        .setColor(c.corpadrão)
    message.channel.send(f1).then(m => {
        m.react(emoji)



        let sim = (r, u) => r.emoji.name === emoji.name && u.id == message.author.id

        let simL = m.createReactionCollector(sim, { time: 120000 })

        simL.on('collect', async _ => {
            message.channel.delete()



        })

    })

}

exports.help = {
    name: "forceclose"
}