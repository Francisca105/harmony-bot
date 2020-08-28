exports.run = (client) => {
    console.log("ESTOU ON ZÉ CU")
    const fs = require('fs')
    const Discord = require('discord.js')
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
    }, 5000)
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
    }, 5000)

}

