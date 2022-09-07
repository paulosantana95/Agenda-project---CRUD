const Login = require('../models/LoginModel')

exports.index = (req, res) => {
  res.render('login');
}

exports.register = async (req, res) => {
  const login = new Login(req.body);
  await login.register();
  
  try{
    if(login.errors.length > 0) {
      req.flash('errors', login.errors);
      req.session.save(function(){
        return res.redirect('back');
      });
      return;
    }

    req.flash('success', 'Usuário criado com sucesso.');
      req.session.save(function(){
        return res.redirect('back');
      });
  } catch(e) {
    console.log(e);
    return res.render('404');
  }
}

