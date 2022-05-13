const express = require('express')
const cors = require('cors')
const userRoute = require('./src/routers/userRoute')

const app = express();
const corsOption = {
  origin: 'http://localhost:3000'
}
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/user', userRoute);

module.exports = app;