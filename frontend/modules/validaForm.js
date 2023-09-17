export default class Validador {
    constructor(formClass) {
        this.form = formClass;
        this.user = this.form.querySelector('.userName');
        this.pass = this.form.querySelector('.pass');
        this.repeatPass = this.form.querySelector('#passwordRepeat');
    }

    events() {
        this.form.addEventListener('submit', e => {
            this.validator(e);
        })
    }

    validator(e) {
        if(!this.checkedField()) {
            e.preventDefault();
            return;
        }

        if(!this.passSize() || !this.userSize()) {
            e.preventDefault();
            return;
        }

        if(this.repeatPass !== null) {
            if(!this.comparePass()) {
                e.preventDefault();
                return;
            }
        }
    }

    userSize() {
        if(this.user.value.length < 3 || this.user.value.length > 20) {
            this.user.nextElementSibling.innerText = 'user de ter 3 a 20 caracteres!'
            return false;
        }

        this.user.nextElementSibling.innerText = '';
        return true;
    }

    passSize() {
        if(this.pass.value.length < 6 || this.pass.value.length > 12) {
            this.pass.nextElementSibling.innerText = 'Sua senha deve conter entre 6 a 12 caracteres !'
            return false;
        }
        this.pass.nextElementSibling.innerText = '';
        return true;
    }

    comparePass() {
        if(this.pass.value !== this.repeatPass.value) {
            this.repeatPass.nextElementSibling.innerText = 'Senhas diferentes !';
            return false;
        };
        if(this.repeatPass.value !== '') {
            this.repeatPass.nextElementSibling.innerText = '';
        }
        return true;
    }

    checkedField() {
        const inputs = this.form.querySelectorAll('input');
        let flag = true;

        inputs.forEach((input) => {
            if(input.value === '') {
                input.nextElementSibling.innerText = 'Campo vazio !';
                flag = false
            }else {
                input.nextElementSibling.innerText = '';
            }
        })

        return flag;
    }
}