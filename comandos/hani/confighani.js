exports.run = async (client, message, args, queue, command) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply('você não possui permissão para executar este comando.')
    const sim = client.emojis.find(e => e.name === "aceito")
    const não = client.emojis.find(e => e.name === "negado")
    const Discord = require('discord.js')
    // if(!args[0]) return message.reply("insira a pergunta e resposta") 
    let msg = message.content.replace('!confighani ', '').split(' | ')

    let perg = msg[0]
    let resp = msg[1]
    if (!perg) return message.reply('insira uma pergunta!')
    if (!resp) return message.reply('insira uma resposta!')


    message.channel.send(`${message.author}, deseja adicionar essa pergunta e resposta à mim?
Pergunta: \`${perg}\`
Resposta: \`${resp}\``).then(async msg => {
        await msg.react(sim)
        await msg.react(não)

        const s = (reaction, user) => reaction.emoji === sim && user.id === message.author.id;
        const n = (reaction, user) => reaction.emoji === não && user.id === message.author.id;

        const sL = msg.createReactionCollector(s)
        const nL = msg.createReactionCollector(n)

        sL.on('collect', async r => {
            const embed = new Discord.RichEmbed()
                .setAuthor("Hani - Assistente", client.user.avatarURL)
                .addField("Nova pergunta adicionada!", `
Pergunta: \`${perg}\`
Resposta: \`${resp}\``)
                .setFooter(`Adicionado por: ${message.author.username}`, message.author.avatarURL)
                .setTimestamp()
                .setColor(client.c.corpadrão)
            client.channels.get('627488941905281045').send(embed)
            const perguntas = new Discord.RichEmbed()
                .setAuthor("Hani - Assistente", client.user.avatarURL)
                .addField("Nova pergunta adicionada!", `
Pergunta: \`${perg}\``)
                .setThumbnail(client.user.avatarURL)
                .setTimestamp()
                .setColor(client.c.corpadrão)
            
            client.channels.get('627501721685327898').send(perguntas)
            new client.Database.Hani({
                pergunta: `${perg.toLowerCase()}`,
                resposta: resp
            }).save()
            message.channel.send(`${message.author}, minha atualização foi cadastrada!`)
            return;
        })
        nL.on('collect', async r => {
            message.channel.send(`${message.author}, minha atualização foi cancelada!`)
            return;
        })

    })
}

exports.help = {
    name: "confighani"
}