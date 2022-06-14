const express = require('express')
const router = express.Router();
const QRCode = require('../controllers/qrcode')

router.post('/create', QRCode.CreateQRCode);

module.exports = router;