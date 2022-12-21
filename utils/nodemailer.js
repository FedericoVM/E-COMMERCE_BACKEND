const nodemailer = require("nodemailer");

const enviarEmail = async(email, remitente, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth:{
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from:remitente,
            to: email,
            html: text
        })
    } catch (error) {
        
    }
}

module.exports = {
    enviarEmail
}