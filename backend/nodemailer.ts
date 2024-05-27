import nodemailer from "nodemailer"
import { GOOGLE_EMAIL, GOOGLE_EMAIL_PASSWORD } from "./secrets";

export const transporter = nodemailer.createTransport({
    service: 'gmail', // replace with your email service
    auth: {
        user: GOOGLE_EMAIL,
        pass: GOOGLE_EMAIL_PASSWORD
    }
});