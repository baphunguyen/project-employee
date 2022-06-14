const express = require('express')
const userRoute = require('./userRoute')
const QRCodeRoute = require('./qrcode')
const routers = express.Router()

routers.use('/user', userRoute);
routers.use('/qrcode', QRCodeRoute);

module.exports = routers;