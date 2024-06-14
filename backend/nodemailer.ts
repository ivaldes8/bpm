import nodemailer from "nodemailer"
import { MAIL, MAIL_PASSWORD, MAIL_CLIENT } from "./secrets";

export const transporter = nodemailer.createTransport({
    service: MAIL_CLIENT,
    auth: {
        user: MAIL,
        pass: MAIL_PASSWORD
    }
});