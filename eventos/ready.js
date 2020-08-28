const cooldown = new Set()//Isto tem que ficar fora de qualquer evento.
exports.run = async (client) => {
    const Discord = require('discord.js')
    const c = require('../comandos/config.json')
    console.log('\n\n\n\n\n\n')
    console.log('Conexão estabelecida com o discord')
    client.setInterval(() => {
        client.Database.Bans.find({}, function (erro, documento) {
            if (documento) {
                for (let i in documento) {
                    // console.log(documento[i])
                    let time = documento[i].time
                    let guildId = documento[i].guild
                    let guild = client.guilds.get(guildId)
                    let member = documento[i].name

                    if (Date.now() > time) {


                        guild.unban(documento[i]._id)
                        documento[i]._id.slice(0)
                        client.Database.Bans.findOneAndDelete({ "_id": documento[i]._id }, function (erro, documento) {
                            if (documento) {
                                const embed = new Discord.RichEmbed()
                                    .setAuthor("Harmony - Punições", client.user.avatarURL)
                                    .addField("Informações do ban:", `Jogador desbanido: \`${member}\``)
                                    .setColor(client.c.corpadrão)
                                    .setThumbnail(client.user.avatarURL)
                                    .setFooter("Finalizado!", client.user.avatarURL)

                                client.guilds.get('599722451496206337').channels.get('625054559420678144').send(embed)
                            }
                        })
                    }
                }

            }
        })
    }, 60000)
    client.setInterval(() => {
        client.Database.Mutes.find({}, function (erro, documento) {
            if (documento) {
                for (let i in documento) {
                    // console.log(documento[i])
                    let time = documento[i].time
                    let guildId = documento[i].guild
                    let guild = client.guilds.get(guildId)
                    let member = guild.members.get(documento[i]._id)
                    let mutedRole = guild.roles.find(r => r.name === "Harmony - Mutado")
                    if (!mutedRole) continue;

                    if (Date.now() > time) {
                        if(!member) continue
                        member.removeRole(mutedRole)
                        documento[i]._id.slice(0)
                        client.Database.Mutes.findOneAndDelete({ "_id": documento[i]._id }, function (erro, documento) {
                            if (documento) {
                                const embed = new Discord.RichEmbed()
                                    .setAuthor("Harmony - Punições", client.user.avatarURL)
                                    .addField("Informações do mute:", `Jogador desmutado: \`${member.user.tag}\``)
                                    .setColor(client.c.corpadrão)
                                    .setThumbnail(client.user.avatarURL)
                                    .setFooter("Finalizado!", member.user.avatarURL)

                                client.guilds.get('599722451496206337').channels.get('625054559420678144').send(embed)
                            }
                        })
                    }
                }

            }
        })
    }, 60000)
    //         const embed = new Discord.RichEmbed()
    //             .setAuthor("Suporte - Harmony", client.user.avatarURL)
    //             .setThumbnail(client.user.avatarURL)
    //             .setDescription('Precisa de suporte? Envie um ticket!')
    //             .addField("Atendimento automático.", `

    // \`❓\` - Dúvidas gerais.
    // \`💡\` - Sugestões.
    // \`🔌\` - Denuncias.
    // \`📪\` - Revisão de uma punição injusta.
    // \`💻\` - Erro/bug dentro do servidor.
    // \`📃\` - Solicitar tag VIP ou Youtuber.
    // \`💰\` - Compras.`)
    //             .setColor(c.corpadrão)
    //             .setFooter('Para ter um contato maior com nossa equipe, para assuntos in-game, basta clicar na categoria desejada.', client.user.avatarURl)
    //     client.channels.get('596108733285662721').send(embed)



    await client.channels.get("596108733285662721").fetchMessage('632982092409602061').then(async msg => {
        await msg.clearReactions()
        await msg.react("📪")
        await msg.react("🔌")
        await msg.react("📃")
        await msg.react("🖥")
        await msg.react("❓")




        const collector = msg.createReactionCollector((r, u) => (r.emoji.name === "🖥", "📃", "❓", "📪", "🔌" && u.id !== client.user.id))

        collector.on("collect", async r => {


            var user = r.users.filter(u => u.id !== client.user.id).map(users => users);
            r.remove(user[0].id)
            switch (r.emoji.name) {



                case "❓":

                    titulo = "Outros"
                    canal = "outros de "
                    cargoA = "Suporte"
                    cargoB = "Moderador"
                    cargoC = "Administrador"
                    break

                case "🖥":

                    titulo = "Erros/Bug"
                    canal = "erro de "
                    cargoA = "Harmony"
                    cargoB = "Supervisor"
                    cargoC = "Administrador"
                    break

                case "🔌":

                    titulo = "Denuncia"
                    canal = "denuncia de"
                    cargoA = "Harmony"
                    cargoB = "Suporte"
                    cargoC = "Moderador"
                    break

                case "📃":

                    titulo = "Solicitação"
                    canal = "solicitação de"
                    cargoA = "Administrador"
                    cargoB = "Harmony"
                    cargoC = "Supervisor"
                    break

                case "📪":

                    titulo = "Revisão"
                    canal = "revisão de"
                    cargoA = "Harmony"
                    cargoB = "Administrador"
                    cargoC = "Supervisor"
                 
            }


            var time_cooldown = 900000 // 15 minutos

            if (cooldown.has(user[0].id)) {


                client.channels.get('596108733285662721').send(`Ei, <@${user[0].id}>, você deve aguardar um breve momento para abrir outro canal de atendimento!`).then(msg => msg.delete(5000));
            } else {
                cooldown.add(user[0].id);

                //Seu codigo será executado aqui.




                let category = client.guilds.get("595961404159426580").channels.find(c => c.name === `${titulo}`)
                if (!category || category.type !== "category")

                    category = await client.guilds.get("595961404159426580").createChannel(`${titulo}`, "category")
                // client.Database.Tickets.findOne({ "_id": user[0].id }, function (erro, documento) {
                //     if (documento) {

                //         return undefined;

                //     } else {
                let qualquermerda = async () => {
        let channel = await client.guilds.get("595961404159426580").createChannel(`${canal} ${user[0].username}`, "text", [{

id: user[0].id,
allowed: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY", "ATTACH_FILES", "EMBED_LINKS"]
}, {
id: client.guilds.get("595961404159426580").roles.find(c => c.name === cargoC).id,
allowed: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY", "ATTACH_FILES", "EMBED_LINKS"]
}, {
id: client.guilds.get("595961404159426580").roles.find(c => c.name === cargoB).id,
allowed: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY", "ATTACH_FILES", "EMBED_LINKS"]
}, {
id: client.guilds.get("595961404159426580").roles.find(c => c.name === cargoA).id,
allowed: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY", "ATTACH_FILES", "EMBED_LINKS"]
}, {
id: client.guilds.get("595961404159426580").defaultRole.id,
denied: Discord.Permissions.ALL
}])

                    await channel.setParent(category.id)




                    user[0].send(`Olá. Já me deve conhecer, eu sou a Hani. Informo-lhe que acabou de abrir um ticket na categoria ${titulo}.
Para acessar, basta clicar aqui: ` + "**<#" + channel.id + ">**")
                    channel.send(`<@${user[0].id}>`).then(msg => msg.delete(2000))


                    channel.send(`Olá.\nJá me deve conhecer, eu sou a Hani. Informo-lhe que acabou de abrir um ticket na categoria **${titulo}**.\n\nDentro de alguns momentos, membros de nossa equipe irão auxiliá-lo a resolver o seu problema existente o mais breve possível.\n\nAté mais!`)

                        //   try {
                        //     var resposta = await client.channels.get(channel.id).awaitMessages(message2 => message2.content > 0 && user[0].id !== client.user.id, {
                        //         time: 10000,
                        //         errors: ['time']
                        //       })
                        // } catch (error) {
                        //     if(channel.messages.filter(m=> user[0].id !== client.user.id)) {
                        //         console.log('p2')
                        //         console.error(error);
                        //         channel.delete()
                        //         return
                        //         // return;
                        //     } else {
                        //         console.log('p1')
                        //         return

                        //     }

                        //     }


                        ;
                    // new client.Database.Tickets({
                    //     _id: user[0].id,
                    // }).save();

                }
                qualquermerda()
                setTimeout(() => {
                    cooldown.delete(user[0].id);
                }, time_cooldown);
            }
            // }
            // })
        })
    })

}
