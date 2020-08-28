exports.run = async (client, message, args) => {
    const { Attachment } = require('discord.js')
const moment = require('moment')
    const channel = message.channel.id    
    const mensagem = args.join(' ')
    if(!mensagem) return

const msgs = await client.channels.get(channel).fetchMessages({ limit: 2 }) // buscar a sua mensagem enviada e a anterior
//  console.log(msgs.first()[0].content)
const times = msgs.map(m => m.createdTimestamp) // pegar só o timestamps das duas mensagens

// console.log(times)
// usa o moment pra verificar se é no mesmo dia
if (moment(times[0]).isSame(times[1], 'day')) {
message.delete()
  await message.channel.send(mensagem)
} else {
message.delete()
    const attachment = new Attachment('./changelog.png', 'welcome-image.png')
    await message.channel.send(attachment)
    await message.channel.send(mensagem)
}
}

exports.help = {
    name: "changelog",
    alias: "equipe"
}