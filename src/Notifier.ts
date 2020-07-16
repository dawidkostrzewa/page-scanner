import nodemailer from 'nodemailer';
import { emailText } from './utils';

class Notifier {

    public static async sendNotification(url: string) {
        try{
            let transporter = nodemailer.createTransport({
                host: process.env.MAILER_HOST,
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                    user: process.env.MAILER_USER,
                    pass: process.env.MAILER_PASSWD,
                },
                tls: {
                    rejectUnauthorized: false,
                },
            });
    
            let info = await transporter.sendMail({
                from: `"NOTIFICATION" <${process.env.SENDER_MAIL}>`, // sender address
                to: process.env.RECEIVE_MAIL, // list of receivers
                subject: `Change on ${url}`, // Subject line
                html: emailText(url) // html body
            });
    
            console.log("Message sent: %s", info.messageId);
        } catch(error) {
            console.log(error);
        }
        
    }
}

export default Notifier;