require ('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./database/connectDB');
const requestLogger = require('./middlewares/logger.js');
const errorHandler = require('./middlewares/errorHandler.js');

const articleRoutes = require('./routes/article.routes.js');

const app = express();
const PORT = process.env.PORT

connectDB();

app.use(express.json());

app.use(cors('*'));

app.use(requestLogger);

app.use('/api', articleRoutes);


app.use(errorHandler);



app.listen(PORT, () =>{
    console.log (`API is running on ${PORT}`)
});