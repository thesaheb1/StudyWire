const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (email, subject, body) => {
  let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

   return await transporter.sendMail({
    from: "StudyWire by SAHEB",
    to: `${email}`,
    subject: `${subject}`,
    html: `${body}`,
  });

};

module.exports = mailSender;
