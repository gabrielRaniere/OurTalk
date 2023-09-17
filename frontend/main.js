import 'core-js/stable';

import 'regenerator-runtime/runtime';

import './assets/css/style.css';

import Validador from './modules/validaForm';

const loginForm = document.querySelector('.login');
const cadastroForm = document.querySelector('.cadastro-form');

if(loginForm !== null) {
    const login = new Validador(loginForm);
    login.events();
    appearMsg(document.querySelector('.success'));
    appearMsg(document.querySelector('.error-session'));
}
if(cadastroForm !== null) {
    const cadastro = new Validador(cadastroForm);
    cadastro.events();
}

function appearMsg(msg) {
    if(msg.innerText.length > 0) {
        msg.style.display = 'block';
        return;
    }
    msg.style.display = 'none';
}


