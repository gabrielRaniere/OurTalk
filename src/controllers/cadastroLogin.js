const Model = require('../models/UsersModel');

exports.index = (req, res) => {
    res.render('cadastro', {
        errors: req.flash('errors')
    });
}

exports.register = async (req, res, next) => {
    const user = new Model(req.body);

    await user.register();
    
    if(user.errors) {
        req.flash('errors', 'Nome de usuário já existe');
        res.redirect('/cadastro');
        return;
    }
    req.flash('success', 'Conta criada com sucesso !');
    res.redirect('/');
    next();
};