const Discord = require('discord.js');  //definindo conexão com discord padrão
const config = require('./comandos/config.json');  //Recuperando dados do arquivo de configuração
const fs = require('fs'); //Definindo constante fs para inicialização de eventos
const client = new Discord.Client();       //definindo o bot como um novo client
client.Database = require("./database.js")
client.c = require('./comandos/config.json')
const c = require('colors')
const queue = new Map();
const cooldown = new Set()

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./comandos", (err, files) => {
    if (err) console.error(err);
    files.forEach((f, i) => {
        let folder = f.split('.');
        if (folder[1]) return;
        fs.readdir(`./comandos/${f}/`, (err, jsf) => {
            let jsfiles = jsf.filter(f => f.split(".").pop() === "js");
            if (jsfiles.length <= 0) {
                return;
            }
            jsfiles.forEach((j, k) => {
                let props = require(`./comandos/${f}/${j}`);
                console.log(c.bold(`[${f.toUpperCase()}] `) + c.inverse(`${j}`) + c.yellow(' Carregado!'))
                client.commands.set(props.help.name, props);
                if (!props.help || !props.help.name || !props.help.aliases || props.help.aliases[0] == '') return;
                props.help.aliases.forEach(alias => {
                    client.aliases.set(alias, props.help.name);


                })
            });
        })
    })
});
client.on('message', async message => {
    if (!message.content.startsWith(config.prefix)) return;
    if (cooldown.has(message.author.id)) {


        message.delete()
        return message.reply("aguarde 10 segundos para executar um novo comando.")
    }
    if (!['425997349135843328', '334029761107984384'].includes(message.author.id)) {


        cooldown.add(message.author.id)
    }
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    if (!message.content.startsWith(config.prefix)) return;

    var messageArray = message.content.split(" ");
    var cmd = messageArray[0].toLowerCase();
    var args = messageArray.slice(1);

    try {
        var command = client.commands.get(cmd.slice(config.prefix.length)) || client.commands.get(client.aliases.get(cmd.slice(config.prefix.length)))
        if (command) command.run(client, message, args, queue, command)
    } catch (err) {
        console.error("Erro:" + err);
    }

    setTimeout(() => {
        cooldown.delete(message.author.id)
    }, 10000)
})

//Método para inicializar Eventos Definidos em Arquivos na pasta events

// client.on("message", message => {
//     if (message.author.bot || message.channel.tyoe === 'dm') return;
//     if (message.channel.name.includes('duvida-de-') || message.channel.name.includes('denuncia-de-')) {
//         if (message.member.roles.some(r=>["Suporte", "Moderador"].includes(r.name))) {
//             message.channel.overwritePermissions('595974272262864910', {
//                 SEND_MESSAGES: false,
//                 ATTACH_FILES: false,
//                 EMBED_LINKS: false
//             })
//             message.channel.overwritePermissions('595970822120931376', {
//                 SEND_MESSAGES: false,
//                 ATTACH_FILES: false,
//                 EMBED_LINKS: false
//             })
//             message.channel.overwritePermissions(message.author.id, {
//                 SEND_MESSAGES: true
//             })
//         }
//     }
// })


// client.on("message", message => { 
//   if(message.author.bot) return;
//   if(!message.content.startsWith(config.prefix)) return;

//   let command = message.content.split(" ")[0];
//   command = command.slice(config.prefix.length);

// let args = message.content.split(" ").slice(1);

//   try {
//         let commandFile = require(`./comandos/${command}.js`);
//         commandFile.run(client, message, args);
//   } catch (err) {
//         console.error("Erro:" + err);
//   }

// });

// Database Create and System XP
// const timexp = new Set()
// client.on("message", message => {

//     if (message.author.bot) return; // Return if not a bot
//     if (timexp.has(message.author.id)) return;
//     timexp.add(message.author.id)
//     setTimeout(() => { // Timing
//         timexp.delete(message.author.id)
//     }, 10000); // 10 Rupias por Minuto
//     client.Database.Users.findOne({ "_id": message.author.id }, function (erro, documento) {
//         if (documento) {
//             documento.money += Math.floor(Math.random() * 50) + 1
//             documento.xp += 15
//             if (documento.xp > documento.level * 350) {
//                 documento.level * 350
//                 documento.level += 1
//                 message.channel.send(`${message.author}, você upou para o level ${documento.level}!`).then(msg=> msg.delete(8000))
//             }
//             documento.save();


//         } else {
//             new client.Database.Users({
//                 _id: message.author.id,
//                 nome: message.author.username
//             }).save();
//         }
// //     })
// });



fs.readdir("./eventos/", (err, files) => {
    if (err) return console.error("ERRO: " + err)

    files.forEach(file => {

        var eventFunction = require(`./eventos/${file}`)
        var eventName = file.split(".")[0]

        client.on(eventName, (...args) => eventFunction.run(client, ...args))
    })
})

client.login('NTk5NzM4MjY3MzQwMTExODgy.XYzgvg.5XUH6m4dZvgzoxxrCbdfsJApsSw');