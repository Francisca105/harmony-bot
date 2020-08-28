exports.run = async (client, message, args) => {

    let mensagem = args.join(' ')
    if (!mensagem) return message.reply('pergunte algo para mim, para que eu possa responder!')

    client.Database.Hani.findOne({ "pergunta": `${mensagem.toLowerCase()}` }, function (erro, documento) {
        if (!documento) return message.reply('ainda não possuo uma resposta para isso!')
        if (documento) {
            message.reply(documento.resposta.charAt(0).toLowerCase() + documento.resposta.slice(1))
        }
    }
    )

}

exports.help = {
    name: "hani"
}