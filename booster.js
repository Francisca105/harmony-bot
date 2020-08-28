exports.run = async (client, message, args) => {
    if (message.channel.id !== "627288984644485150") return 

   

    const nick = args[0]
    if(!nick) return message.reply("informe seu nick.") 

//     const staffers = message.guild.members.filter(member => member.roles.has('595970179586981888') && member.roles.has('595969701423742984'))
// staffers.send('seu pedido foi enviado, basta aguardar agora.')
message.guild.members.filter(member => member.roles.has('595970179586981888') || member.roles.has('595969701423742984')).forEach(membro => membro.send(`O jogador \`${nick}\` está solicitando suas recompensas, usuário: ${message.author.tag}`).catch(() => null));

message.reply("seu pedido foi enviado, basta aguardar agora.")
}

exports.help = {
    name: "booster"
}