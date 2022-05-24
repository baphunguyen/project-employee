const nodemailer = require('nodemailer');


module.exports = {
  sendEmail(from, to, subject, new_password) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        proxy: 'http://proxy.fpt.vn:80',
        auth: {
          user: '',
          pass: '',
        }
      })
      // const testAccount = await nodemailer.createTestAccount();
      // console.log(testAccount)
      // const transporter = await nodemailer.createTransport({
      //   service: 'gmail',
      //   auth: {
      //     user: 'baphunguyen99@gmail.com',
      //     pass: 'baphu01255787355',
      //   },
      //   tls: {
      //     rejectUnauthorized: true
      //   }
      // })
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

    // const info = await transporter.sendMail({
    //   from: 'baphunguyen99@gmail.com',
    //   to: 'nguyenduongbaphuag@gmail.com',
    //   subject: 'Hello',
    //   text: 'Hello World',
    //   html: '<b>Hello world?</b>'
    // });
    // console.log(info);
    // console.log("Message sent: %s", info.messageId);
    // return await transport.sendMail({from, to, subject, html});
    // return result;
    // return new Promise((resolve, reject) => {
    //   transport.sendMail({from, to, subject, html}, (err, info) => {
    //     if (err) reject(err);
    //     console.log(info);
    //     resolve(info);
    //   })
    // })
  }
}