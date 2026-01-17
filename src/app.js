require('dotenv').config();

const express = require('express');
const cors = require('cors');
const requestLogger = require('./middlewares/logger.js');
const errorHandler = require('./middlewares/errorHandler.js');

const articleRoutes = require('./routes/article.routes.js');
const userRoutes = require ('./routes/user.route.js');

const app = express();

app.use(express.json());

app.use(cors('*'));

app.use(requestLogger);

app.use('/api', articleRoutes);
app.use('/api/users/', userRoutes);


app.use(errorHandler);

module.exports = app;