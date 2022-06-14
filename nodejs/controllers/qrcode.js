const QRCode = require('qrcode');

async function CreateQRCode(req, res) {
  const text = req.body.textQR;
  const qr = await QRCode.toDataURL(text, {
    color: {
      dark: '#000000',
      light: '#ffffff'
    },
  });
  return res.send(qr);
}

const QRCodeController = {
  CreateQRCode: CreateQRCode,
}

module.exports = QRCodeController;