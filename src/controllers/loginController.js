const Login = require('../models/LoginModel')

exports.index = (req, res) => {
  if(req.session.user) return res.render('login-logado');
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

exports.enter = async (req, res) => {
  const login = new Login(req.body);
  await login.login();
  
  try{
    if(login.errors.length > 0) {
      req.flash('errors', login.errors);
      req.session.save(function(){
        return res.redirect('back');
      });
      return;
    }

      req.flash('success', 'Usuário logado com sucesso.');
      req.session.user = login.user;
      req.session.save(function() { 
        return res.redirect('back') 
      });

  } catch(e) {
    console.log(e);
    return res.render('404');
  }
}

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/')
}