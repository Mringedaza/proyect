// correo.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'finderparty06@gmail.com',
    pass: 'kikn mnmw jrem dvys'
  }
});

module.exports = transporter;