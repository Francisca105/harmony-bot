const sleep = time => new Promise(resolve => {

    setTimeout(resolve, time)
});

const Discord = require('discord.js')
exports.run = async (client, message, args) => {
    message.delete()
    const moment = require('moment')
    const hastebin = require('hastebin.js')
    const haste = new hastebin({ /* url: 'hastebin.com */ });
    moment.locale('pt-br');
    var nada = []
    var nm = 0

    const c = require('../config.json')
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return;

    const sim = client.emojis.find(e => e.name === "Certo")
    const não = client.emojis.find(e => e.name === "ErradoTBF")
    // const guildChannel = message.channel
    // console.log(message.channel.permissionOverwrites.filter(a => a.type === "member").first())
    const usuario = message.channel.permissionOverwrites.filter(a => a.type === "member").first()

    message.channel.send(`<@${usuario.id}>, está sendo solicitado o encerramento do atendimento. Seu atendimento foi resolvido?`).then(async msg => {
        await msg.react(sim)
        await msg.react(não)

        const s = (reaction, user) => reaction.emoji === sim && user.id === usuario.id;
        const n = (reaction, user) => reaction.emoji === não && user.id === usuario.id;

        const sL = msg.createReactionCollector(s, { time: 21600000 })
        const nL = msg.createReactionCollector(n, { time: 21600000 })

        
        // sL.on('end', async r => {
            
        // })

        sL.on('collect', r => {
            msg.delete() 



                message.channel.send(`<@${usuario.id}>, deixe aqui sua avaliação deste atendimento.
            \n
           1⃣ | Esse atendimento foi péssimo!
           2⃣ | Esse atendimento foi ruim!
           3⃣ | Esse atendimento foi bom!
           4⃣ | Esse atendimento foi ótimo!
           5⃣ | Esse atendimento foi excelente!`).then(async msg => {
                    await msg.react("1⃣")
                    await msg.react("2⃣")
                    await msg.react("3⃣")
                    await msg.react("4⃣")
                    await msg.react("5⃣")


                    const collector = msg.createReactionCollector((r, u) => (r.emoji.name === "1⃣", "2⃣", "3⃣", "4⃣", "5⃣" && u.id === usuario.id))

                    collector.on("collect", async r => {

                        switch (r.emoji.name) {

                            case "1⃣":
                                rate = "⭐"
                                break
                            case "2⃣":
                                rate = "⭐⭐"
                                break
                            case "3⃣":
                                rate = "⭐⭐⭐"
                                break
                            case "4⃣":
                                rate = "⭐⭐⭐⭐"
                                break
                            case "5⃣":
                                rate = "⭐⭐⭐⭐⭐"
                        }

                        message.channel.fetchMessages({ limit: 100 }).then(messa => {
                            for (var i = 0; i < messa.size; i++) {

                                if (messa.array()[i]) {
                                    if (nm >= 100) {
                                        // 
                                    } else {
                                        nada += `[${moment(messa.array()[i].createdTimestamp).format('l')}] [${moment(messa.array()[i].createdTimestamp).format('LTS')}]  ${messa.array()[i].author.tag}: ${messa.array()[i].content}\n`
                                        nm++
                                    }
                                }
                            }
                            if (nm == 0) {
                                nada += "Nao Achei Nenhuma Mensagem Recente Desse Usuario!"
                            }
                            if (nada == []) {
                                nada += "Nao Achei Nenhuma Mensagem Recente Desse Usuario!"
                            }
                            if (nada == ['']) {
                                nada += "Nao Achei Nenhuma Mensagem Recente Desse Usuario!"
                            } try {

                                const link = haste.post(nada).then(link => {

                                    


                                    const embed = new Discord.RichEmbed()
                                        .setColor(c.corpadrão)
                                        .setDescription(`Fechado por: ${message.author.tag}
Aberto por: <@${usuario.id}> - \`${usuario.id}\`
Avaliação: \`${rate}\` 
Logs do atendimento: ${link}`)
                                        .setAuthor("Avaliação de atendimento", message.author.avatarURL)
                                        .setTimestamp()
                                        .setThumbnail(client.user.avatarURL)
                                    client.channels.get('625054682565574656').send(embed)

                                    message.channel.send(`<@${usuario.id}>, o seu atendimento está sendo finalizado!`).then(async msg => {

                                        await sleep(1000)
                                        msg.edit("Finalizando em **3 segundos**.")

                                        await sleep(1000)
                                        msg.edit("Finalizando em **2 segundos**.")

                                        await sleep(1000)
                                        msg.edit("Finalizando em **1 segundo**.")

                                        await sleep(1000)
                                        message.channel.delete()
                                    })
                                })
                            } catch (err) {
                                console.log('.')
                            }
                        })
                    })
                })
                return;
        })
        nL.on('collect', async r => {
            msg.delete()
            message.channel.send("@everyone").then(msg => msg.delete(2000))
            message.channel.send(`O atendimento do usuario <@${usuario.id}>, não foi concluido. Atendam ele o mais rápido possivel.`)
            return;
        })
        nL.on('end', async r => {
            const jogador = client.users.get(usuario.id)
            jogador.send("Seu atendimento foi fechado automaticamente devido não haver nenhuma resposta sua.")

            await sleep(1000)
            message.channel.send("Tempo esgotado, finalizando em **3 segundos**.")

            await sleep(1000)
            message.channel.send("Tempo esgotado, finalizando em **2 segundos**.")

            await sleep(1000)
            message.channel.send("Tempo esgotado, finalizando em **1 segundo**.")

            await sleep(1000)
            message.channel.delete()
            return;
        })
    })


  
}



// message.channel.send(guildChannel)


exports.help = {
    name: "finalizar",
    alias: "fechar"
}