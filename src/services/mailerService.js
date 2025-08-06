const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'rnishant428@gmail.com',
        pass: 'opsavizutfohqkci',
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
