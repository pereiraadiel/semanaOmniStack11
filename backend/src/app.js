const express = require('express');
const routes = require('./routes');
const { errors } = require('celebrate');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());
//app.listen(3999);

module.exports = app;