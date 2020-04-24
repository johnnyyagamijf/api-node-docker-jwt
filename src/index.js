const express = require('express');
const app = express();
const morgan = require('morgan');
require('dotenv').config();

app.use(express.json());
app.use(morgan('dev'));

// Configura os cors
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, OPTIONS, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
  res.header('Access-Control-Allow-Origin', '*');
  
  next();
});

// Rotas
app.use(require('../src/routes/task'));
app.use(require('../src/routes/user'));

// Configuração do banco de dados
require('./Config');

const PORT = 3333;
const HOST = '0.0.0.0';

app.listen(PORT, HOST);