exports.user = (req, res, next) => {
    res.locals.user = req.session.user;
    next();
};  

exports.requireSession = (req, res, next) => {
    if(!req.session.user) {
        req.flash('errorSession', 'você deve estar logado para continuar !');

        req.session.save(() => {
            res.redirect('/')
        })
    }

    next();
};