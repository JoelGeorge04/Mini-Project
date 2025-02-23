import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); 
// Function to send password reset email
const passResetMail = async (email, name, resetUrl) => {
  // Create a transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.NODEMAILER_EMAIL, // Replace with your email
      pass: process.env.NODEMAILER_PASS,  // Replace with your app password or real password
    },
  });

  // Compose the email
  const info = await transporter.sendMail({
    from: '"BookMyResource Team" <joelgeorge4002@gmail.com>', // Replace with your email
    to: email,
    subject: "Password Reset Request - BookMyResource",
    text: `Hello ${name},\n\nTo reset your password, please click on the following link: ${resetUrl}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f9; padding: 30px; border-radius: 10px; width: 80%; max-width: 600px; margin: 0 auto; border: 1px solid #ccc; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #4CAF50; font-size: 24px; margin-bottom: 20px;">Hello ${name},</h2>
        <p style="color: #555; font-size: 16px; margin-bottom: 20px;">We received a request to reset your password. Please click on the link below to reset your password:</p>
        <p style="font-size: 16px; color: #4CAF50; margin-bottom: 30px;"><a href="${resetUrl}" style="color:rgb(63, 63, 181); text-decoration: none;">Reset Password</a></p>
        <p style="color: #555; font-size: 16px; margin-bottom: 30px;">If you did not request a password reset, please ignore this email.</p>
        <br />
        <p style="font-size: 14px; color: #777; margin-top: 20px;">Best regards,<br><span style="color: #4CAF50;">The BookMyResource Team</span></p>
        <hr style="border: 0; border-top: 1px solid #ddd; margin: 20px 0;" />
        <footer style="text-align: center; font-size: 12px; color: #888;">This is an automated message. Please do not reply.</footer>
      </div>
    `,
  });

  console.log("Message sent: %s", info.messageId);
};

export default passResetMail;
