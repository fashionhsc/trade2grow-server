const nodemailer = require('nodemailer');
require('dotenv').config();
const fs = require('fs');
const path = require('path');


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASS,
  },
});

/**
 * Sends OTP to given email.
 */
const sendOtpEmail = async (to, otp) => {
  const templatePath = path.join(__dirname, 'templates/otpEmailTemplate.html');
  const template = fs.readFileSync(templatePath, 'utf-8');
  const htmlContent = template.replace('{{OTP_CODE}}', otp);
  const mailOptions = {
    from: `"Trade2Grow" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Your OTP Code - Trade2Grow',
    html:htmlContent,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendOtpEmail };
