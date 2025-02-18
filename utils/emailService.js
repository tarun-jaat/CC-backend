const nodemailer = require("nodemailer");
require('dotenv').config()

const mailSender = async (email, title, body) => {
    try {
        let transporter = nodemailer.createTransport({
            pool: true,
            maxConnections: 5,
            host: process.env.MAIL_HOST,
            port: 465,
            secure: true,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false
            }
        });
  
        let info = await transporter.sendMail({
            from: `"Corporate Cruise" <${process.env.MAIL_USER}>`,
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,
        });
        console.log(info);
        return info;
    } catch (error) {
        console.log(error.message);
        return error;
    }
}

module.exports = mailSender;