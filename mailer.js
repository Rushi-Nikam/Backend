const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
        user:'alanna.medhurst78@ethereal.email', // Your email
        pass: "5ZpnQ4r4VfF9eUG7zk"  // Your email password 
    }
});

const sendVerificationEmail = (to, verificationLink) => {
    const mailOptions = {
        from: "alanna.medhurst78@ethereal.email", 
        to: to,
        subject: 'Email Verification', 
        text: `Please verify your email by clicking on the following link: ${verificationLink}` 
    };

    return transporter.sendMail(mailOptions);
};

module.exports = { sendVerificationEmail };