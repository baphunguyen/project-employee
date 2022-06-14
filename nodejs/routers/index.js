const express = require('express')
const userRoute = require('./userRoute')
const routers = express.Router()

routers.use('/user', userRoute);

module.exports = routers;