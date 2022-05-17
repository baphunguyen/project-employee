const express = require('express')
const cors = require('cors')
const routers = require('./routers')

const app = express();
const corsOption = {
  origin: 'http://localhost:3000'
}
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(routers);

module.exports = app;