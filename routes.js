const express = require('express');
const route = express.Router();
const loginController = require('./src/controllers/homeController');
const cadastroController = require('./src/controllers/cadastroLogin');
const chatController = require('./src/controllers/chatController');

const {requireSession} = require('./src/midlewares/globalMidlwares')

// login page
route.get('/', loginController.index);
route.post('/', loginController.login);


// signIn page
route.get('/cadastro', cadastroController.index);
route.post('/cadastro/register', cadastroController.register);

// userLogedPag
route.get('/chatUser/:id', requireSession,  chatController.index);
route.post('/chatUser/:id', chatController.createMsg)

route.get('/deleteSession', requireSession,  chatController.deleteSession);


module.exports.routes = route;






