exports.run = (client, message, args) => {
    message.delete()


    const e = client.emojis.find(e => e.name === "reload_")
    const Discord = require('discord.js')
    const c = require('../config.json')
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply('você não possui permissão para executar este comando.')

    const mensg = args.join(" ")
    const file = message.attachments.first()
    if (file && mensg) message.channel.send(mensg, { files: [file.url] })
    else if (file) message.channel.send({ files: [file.url] })
    else if (mensg) message.channel.send(mensg)


}

exports.help = {
    name: "say",
    aliases: [
        "falar",
        "anunciar",
        "anuncio",
        "aviso"
    ]
}