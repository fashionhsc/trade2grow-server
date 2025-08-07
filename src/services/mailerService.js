const nodemailer = require('nodemailer');
require('dotenv').config();


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
    const mailOptions = {
        from: `"Trade2Grow" <${process.env.EMAIL_USER}>`,
        to,
        subject: 'Your OTP Code - Trade2Grow',
        html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Your OTP Code</h2>
        <p>Use the following OTP to continue:</p>
        <h1 style="letter-spacing: 3px;">${otp}</h1>
        <p>This code will expire in 10 minutes.</p>
        <hr/>
        <p>Thanks,<br/>Trade2Grow Team</p>
      </div>
    `,
    };

    return transporter.sendMail(mailOptions);
};

module.exports = { sendOtpEmail };
