import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
// TODO: Probar, parece correcto, sobrecargar sendErrorEmail con destinatario
// TODO: Multiples cuentas destinatarias??
// TODO: Handler de mail también
// TODO: Añadir gestión de errores también más allá del mail
// TODO: service GMAIL (comprobar) por ahora dejo por defecto

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        /*
            this.transporter = nodemailer.createTransport({
                host: 'something.yourdomain.com',
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                user: 'username@mydomain.com', // your domain email address
                pass: 'password' // your password
                }
            });
        */
    }

    async sendErrorEmail(errorMessage) {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.ERROR_NOTIFICATION_EMAIL,
            subject: process.env.EMAIL_SUBJECT,
            text: `${process.env.EMAIL_TEXT} ${errorMessage}`
        };

        try {
            await this.transporter.sendMail(mailOptions);
        } catch (error) {
            console.error('Error sending email:', error);
        }
    }
}

export default new EmailService();