const LoginModel = require('../models/UsersModel');
const MsgModel = require('../models/chatModel');

exports.index = async (req, res) => {
    const mensagens = await MsgModel.echoMsgs();

    res.render('globalChat', {
        mensagens, 
        idParam: req.params.id
    });
}

exports.createMsg = async (req, res) => {

    const user = await LoginModel.searchUser(req.params.id);
    
    const msg = {
        titulo: req.body.title,
        mensagem: req.body.mensagem,
        idAuthor: user.userName,
        id: req.params.id
    }

    const model = new MsgModel(msg);

    await model.register();

    res.redirect(`/chatUser/${req.params.id}`);
}

exports.deleteSession = async (req, res) => {
    if(req.session.user) {
        req.session.save(() => {
            req.session.destroy();
            res.redirect('/');
        })
    }
}



