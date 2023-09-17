const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    titulo: {type: String, required: true, default: ''},
    mensagem: {type: String, required: true, default: ''},
    idAuthor: {type: String, required: true},
    id: {type: String, required: true},
    data: {type: Date, default: Date.now},
})

const msgModel = mongoose.model('mensagens', schema);

module.exports = class Model{
    constructor(body) {
        this.body = body;
    }

    async register() {
        await msgModel.create(this.body);
    }

    static async echoMsgs() {
        return await msgModel.find().sort({data: 1});
    }
}