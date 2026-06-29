import dotenv from 'dotenv';
dotenv.config();


import nodemailer from 'nodemailer';
const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.USER_EMAIL,
        pass:process.env.APP_PASSWORD
    }
});

async function sendEmail(to,subject,message) {
 await transporter.sendMail({
    from:process.env.USER_EMAIL,
    to,
    subject,
    text:message
 });
    
}
export default sendEmail;

