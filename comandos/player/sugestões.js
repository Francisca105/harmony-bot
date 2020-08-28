exports.run = async (client, message, args) => {

    const s = client.emojis.find(e=> e.name === "Certo");
    const n = client.emojis.find(e=> e.name === "ErradoTBF")
    message.delete()
    const mensagem = args.join(' ')
    if(!mensagem) return message.reply('digite uma sugestão para enviar.').then(msg=> msg.delete(8000))
    message.reply('sua sugestão foi enviada com sucesso! 📫').then(msg=> msg.delete(8000))
    const Discord = require('discord.js')
    const embed = new Discord.RichEmbed()
        .setAuthor('Harmony - Sugestões', client.user.avatarURL)
        .setDescription(`Sugestão enviada por: ${message.author.tag}\n\n**Sugestão:**\n    ${mensagem}\n`)
        .setFooter(`Enviada por: ${message.author.tag}`, message.author.avatarURL)
        .setColor(client.c.corpadrão)
        client.channels.get('637382827465244705').send(embed).then(async msg=> {
            await msg.react(n)
            await msg.react(s)
        })
    }

    exports.help = {
        name: "sugerir"

    }