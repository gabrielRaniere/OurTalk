const Login = require('../models/UsersModel');

exports.index = (req, res) => {
    res.render('home', 
    {
    success: req.flash('success'),
    errors: req.flash('errors'),
    errorSession: req.flash('errorSession')
    })
};

exports.login = async (req, res) => {
    try{
        const login = new Login(req.body);

    if(await login.login()) {
        req.session.user = login.user._id;
        res.redirect(`/chatUser/${req.session.user}`);
    }


    req.flash('errors', 'Usuário ou senha não existem !');
    res.redirect('/');
    }catch(e) {
        console.log(e)
    }
};