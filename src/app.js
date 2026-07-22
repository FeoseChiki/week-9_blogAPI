require('dotenv').config();

const validateEnv = require('../src/validations/validateEnv.js');

const express = require('express');
const cors = require('cors');
const requestLogger = require('./middlewares/logger.js');
const errorHandler = require('./middlewares/errorHandler.js');

const articleRoutes = require('./routes/article.routes.js');
const userRoutes = require ('./routes/user.route.js');


validateEnv();

const app = express();

app.use(express.json());

app.use(cors('*'));

app.use(requestLogger);

app.get('/', (req, res) => {
    res.send ("Blog API is running successfully");
});

app.post("/upload", (req, res) =>{

    console.log('body', req.body)
    console.log('file', req.file)


    res.send('Hello, from upload')
});

app.use('/api', articleRoutes);
app.use('/api/users/', userRoutes);


app.use(errorHandler);

module.exports = app;