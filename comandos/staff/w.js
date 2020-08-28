exports.run = (client, message, args) => {
    message.delete()
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return;
    const usuario = message.channel.permissionOverwrites.filter(a => a.type === "member").first()
    message.channel.send(`<@${usuario.id}>`).then(msg=> msg.delete(1000))
}
exports.help = {
    name: 'w'
}