const mongoose = require("mongoose");

mongoose.connect('mongodb://ImLuan_:Admin132@cluster0-shard-00-00-01olg.mongodb.net:27017,cluster0-shard-00-01-01olg.mongodb.net:27017,cluster0-shard-00-02-01olg.mongodb.net:27017/harmony-network?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true', { useNewUrlParser: true }, (err) => {
    if (err) return console.log(`Erro ao conectar no database!\n${err}`)
    console.log(`Conectado ao BANCO DE DADOS!`)
})
var Schema = mongoose.Schema // just to make it cute

var User = new Schema({
    _id: { type: String, required: true }, // ID of User
    nome: { type: String, required: true },
    money: { type: Number, default: 0 },
    level: { type: Number, default: 1 }, // Rank of User
    xp: { type: Number, default: 0 } // Xp of User
})
var Ticket = new Schema({
    _id: { type: String, required: true }
})

var Mute = new Schema({
    _id: { type: String, required: true },
    guild: { type: String },
    time: { type: Number }
})

var Ban = new Schema({
    _id: { type: String, required: true },
    name: { type: String },
    guild: { type: String },
    time: { type: Number }
})

var hani = new Schema({
    pergunta: {type: String, required: true},
    resposta: {type: String, required: true}
})

var Tickets = mongoose.model("Ticket", Ticket)
var Users = mongoose.model("Users", User);
var Mutes = mongoose.model("Mutados", Mute);
var Bans = mongoose.model("Banidos", Ban);
var Hani = mongoose.model("Hani", hani);
exports.Hani = Hani
exports.Bans = Bans
exports.Mutes = Mutes
exports.Users = Users
exports.Tickets = Tickets