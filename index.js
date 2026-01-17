require('dotenv').config();
const connectDB = require('./src/config/connectDB.js');
const app = require('./src/app');

const PORT = process.env.PORT
const JWT_SECRET = process.env.JWT_SECRET

console.log(JWT_SECRET);

app.listen(PORT, async () =>{
    await connectDB();
    console.log (`API is running on ${PORT}`)
});