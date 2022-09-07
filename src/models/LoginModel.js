const mongoose = require('mongoose');
const { async } = require('regenerator-runtime');
const validator = require('validator');

const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async register() {
    this.validateUser();
    if(this.errors.length > 0) return;

    try {
      this.user = await LoginModel.create(this.body);
    } catch(e) {
      console.log(e);
    }
  }

  validateUser() {
    this.cleanUp()
    //Validação
    //E-mail precisa ser válido
    if(!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');

    //Senha precisa ter entre 3 e 12 carac.
    if(this.body.password.length < 3 || this.body.password.length > 12) {
      this.errors.push('Senha deve conter entre 3 a 12 caracteres.');
    }
  }

  cleanUp() {
    for(const key in this.body) {
      if (typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }

    this.body = {
      email: this.body.email,
      password: this.body.password
    }
  }

}

module.exports = Login;