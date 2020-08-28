const Discord = require('discord.js')
const fs = require("fs")

exports.run = async (client, message, args) => {

    message.delete()
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply('você não possui permissão para executar esse comando.').then(msg => msg.delete(8000))

    let toBan = message.mentions.members.first();
    if (!toBan) return message.reply("é necessário mencionar alguém que você deseja banir.").then(msg => msg.delete(8000))
    let reason = args.slice(1).join(" ");
    let motivo = args.slice(2).join(" ")
    if (toBan.id === message.author.id) return message.reply("você não pode banir si mesmo.").then(msg => msg.delete(8000))
    if (toBan.highestRole.position >= message.member.highestRole.position) return message.reply("esse usuário possui um cargo maior que o seu.").then(msg => msg.delete(8000))

    if (reason.length < 1) return message.reply("defina o tempo da punição.").then(msg => msg.delete(8000));

    var numero = args[1].replace(/m/g, "").replace(/h/g, "").replace(/d/g, "").replace(/s/g, "")
    var res = args[1].replace(`${numero}m`, 60 * Number(numero)).replace(`${numero}h`, 3600 * Number(numero)).replace(`${numero}d`, 86400 * Number(numero)).replace(`${numero}`, 1 * Number(numero)).replace(`${numero}s`, 1 * Number(numero))
    var conta = res
    var time = res / 60 + ` minuto(s)`; // tempo normal
    if (conta < 60) {
        time = res + ` segundos`
    } // Segundos
    if (conta == 2 - 1) {
        time = res + ` segundo`
    } // Segundos
    if (conta > 60 * 60 * 2 - 1) {
        time = res / 60 / 60 + ` horas`
    } // Minutos para horas
    if (conta == 3600) {
        time = res / 60 / 60 + ` hora`
    } // Minutos para horas
    if (conta > 86400 - 1) {
        time = res / 60 / 60 / 24 + ` dia`
    } // horas para dias
    if (conta > 86400 * 2 - 1) {
        time = res / 60 / 60 / 24 + ` dias`
    } // horas para dias
    if (conta < 10) return message.reply("O tempo minímo banido é de 10 segundos.").then(msg => msg.delete(8000));
    if (!motivo) return message.reply("é necessário definir o motivo da punição.").then(msg => msg.delete(8000))



    new client.Database.Bans({
        _id: toBan.id,
        name: toBan.user.tag,
        guild: message.guild.id,
        time: Number(Date.now()) + Number(res) * 1000
    }).save()
    // client.mutes[toMute.id] = {
    //     guild: message.guild.id,
    //     time: Number(Date.now()) +  Number(res)*1000

    // }



    await toBan.ban(motivo)
    const embed = new Discord.RichEmbed()
        .setAuthor("Harmony - Punições", client.user.avatarURL)
        .addField("Informações do ban:", `Jogador banido: \`${toBan.user.tag}\`
Staff que baniu: ${message.author.tag}
    
Tempo do ban: ${time}
Motivo: ${motivo}`)
        .setColor(client.c.corpadrão)
        .setThumbnail(client.user.avatarURL)
        .setFooter("Finaliza em:", message.author.avatarURL)
        .setTimestamp(Number(Date.now()) + Number(res) * 1000)
    client.guilds.get('599722451496206337').channels.get('625054559420678144').send(embed)
    message.channel.send(`O jogador punido com sucesso.`).then(msg => msg.delete(20000))

}

exports.help = {
    name: "ban",
    alias: "tempban"


}