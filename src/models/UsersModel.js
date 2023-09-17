const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const schema = new mongoose.Schema({
    userName: {type: String, required: true},
    password: {type: String, required: true}
});

const UserModel = mongoose.model('usuários', schema);

module.exports = class Model {
    constructor(reqBody) {
        this.body = reqBody;
        this.errors = false;;
        this.user = null;
    }

    static async searchUser(id) {
        return await UserModel.findById(id);
    }

    async login() {
        if(await this.countIsTrue()) return true;

        return false;
    }

    async register() {
        const userExist = await this.userExists();

        if(userExist){
            this.errors = true;
            return;
        }

        const hash = await bcryptjs.hash(this.body.password, 10);
        this.body.password = hash

        await UserModel.create(this.body);
    }

    async countIsTrue() {

        try{

            this.user = await UserModel.findOne({
                userName: this.body.userName
        });

            const use = await bcryptjs.compare(this.body.password, this.user.password);

            if(use) return true;

        return false;

        }catch(e){
            console.log(e);
        }
    }

    async userExists() {
        const user = await UserModel.findOne({userName: this.body.userName});

        if(user) return true;

        return false;
    }
}