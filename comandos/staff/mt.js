exports.run = async (client, message, args) => {
    message.delete()
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply('você não possui permissão para executar este comando.').then(msg => msg.delete(8000))
    message.channel.send('@everyone @here').then(msg => msg.delete(500))

}

exports.help = {
    name: "mt"
}