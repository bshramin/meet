import nodemailer from "nodemailer";

// Configure SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.SOURCE_EMAIL_HOST,
  port: 465,
  secure: true, // Use true for port 465, false for 587
  auth: {
    user: process.env.SOURCE_EMAIL,
    pass: process.env.SOURCE_EMAIL_PASSWORD,
  },
});

export async function sendEmail(
  to: string,
  subject: string,
  text: string,
  html: string
): Promise<boolean> {
  const sourceEmail = process.env.SOURCE_EMAIL;
  console.log("Sending email to", to);

  try {
    await transporter.sendMail({
      from: sourceEmail,
      to: to,
      subject: subject,
      text: text,
      html: html,
    });

    console.log("Email sent successfully to ", to);
    return true;
  } catch (err) {
    console.error("Error sending email", err);
    return false;
  }
}
