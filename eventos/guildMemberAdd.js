exports.run = (client, member) => {
    client.channels.get('600699396627365899').fetchMessage('601471777612234752').then(msg => {
        const x = client.emojis.find(e => e.name === "aceito")
        msg.edit(`${x} Estamos com atualmente ${member.guild.memberCount} membros em nosso discord!`)
    })
}