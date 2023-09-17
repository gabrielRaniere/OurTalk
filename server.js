require('dotenv').config();
const express = require('express');
const routes = require('./routes')
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const helmet = require('helmet');
const flash = require('connect-flash');
const session = require('express-session');
const {user} = require('./src/midlewares/globalMidlwares');
const MongoStore = require('connect-mongo');

mongoose.connect(process.env.STRINGKEY)
.then(() => {console.log('base carregada')})

app.use(express.urlencoded({ extended: true }));
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(session({
    secret: 'suaChaveSecreta',
    store: (MongoStore.create({mongoUrl: process.env.STRINGKEY})), // Chave secreta para assinar o cookie de sessão (deve ser mantida em segredo)
    resave: false, // Evita que a sessão seja salva a cada solicitação
    saveUninitialized: true, // Salva uma sessão, mesmo que não tenha sido inicializada
    cookie: {
      secure: false, // Defina como true para usar apenas em conexões HTTPS
      maxAge: 3600000, // Tempo de vida do cookie da sessão em milissegundos (1 hora neste exemplo)
    },
  }));
  
app.use(flash());

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.static(path.resolve(__dirname, 'frontend', 'assets', 'imgs')))
app.use(helmet());
app.use(user);
app.use(routes.routes);

app.listen(3000, () => {
    console.log('servidor aberto...')
});

