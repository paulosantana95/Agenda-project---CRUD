const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');


//Rotas da homePage
route.get('/', homeController.index);

// Rotas de login 
route.get('/login', loginController.index);
route.post('/login/register', loginController.register);
route.post('/login/enter', loginController.enter);
route.get('/login/logout', loginController.logout);

module.exports = route;