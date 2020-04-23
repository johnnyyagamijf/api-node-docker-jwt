const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(express.json());
const routes = require('./routes');
require('dotenv').config();
app.use(morgan('dev'));
app.use(routes);

app.use(require('../src/routes/task'));
app.use(require('../src/routes/user'));

require('./services/Config');
const PORT = 3333;
const HOST = '0.0.0.0';

app.listen(PORT, HOST);