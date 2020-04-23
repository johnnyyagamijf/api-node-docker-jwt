const express = require('express');
const app = express();
const morgan = require('morgan');
require('dotenv').config();

app.use(express.json());
app.use(morgan('dev'));

// Rotas
app.use(require('../src/routes/task'));
app.use(require('../src/routes/user'));

// Configuração do banco de dados
require('./services/Config');

const PORT = 3333;
const HOST = '0.0.0.0';

app.listen(PORT, HOST);