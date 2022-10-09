require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTION_STRING, 
  {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('MongoDB is running');
    app.emit('running');
  })
  .catch(e => console.log(e));

const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const routes = require('./routes');
const path = require('path');
// const helmet = require('helmet');
const csrf = require('csurf');
const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware');

// app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));

const sessionOptions = session({
  secret: 'godevs123456',
  // store: new MongoStore({mongooseConnection: mongoose.connection}), // (inválido nas versões mais autais)
  store: MongoStore.create({ mongoUrl: process.env.CONNECTION_STRING }), // Correção para o problema do código antigo do Store
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000* 60 * 60 * 24 * 7,
    httpOnly: true
  }
});
app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csrf());
// Meu middleware para aprendizado.
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(routes);

app.on('running', () => {
  app.listen(3000, () => {
    console.log('http://localhost:3000/');
    console.log('Server is running.');
  });
});
