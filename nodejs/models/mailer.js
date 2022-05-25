const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  pool: true,
  service: 'Gmail',
  auth: {
    user: '',
    pass: '',
  },
  tls: {
    rejectUnauthorized: false
  }
});

module.exports = {
  sendEmail(from, to, subject, new_password) {
    try {
      const html = `Hi there,
        <br/>
        Thanks you for reset password
        <br/><br/>
        Please use new password for your account:
        <br/>
        New Password: ${new_password}`
      return new Promise((resolve, reject) => {
        transporter.sendMail({from, to, subject, html}, (err, info) => {
          if (err) reject(err);
          console.log(info);
          resolve(info);
        });
      })
    } catch (e) {
      console.log(e)
    }
  }
}