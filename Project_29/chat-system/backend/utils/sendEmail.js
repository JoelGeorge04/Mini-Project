import nodemailer from 'nodemailer';

const sendEmail = async (email, name) => {

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  // const link = `${process.env.APP_URL}/verify?token=${token}`;

  const info = await transporter.sendMail({
    from: '"BookMyResource Team" <joelgeorge4002@gmail.com>',
    to: email,
    subject: "BookMyResource Team",
    text: `Hello ${name},\nThank you for signing up!`,
    html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f9f9f9; padding: 20px; border-radius: 8px; width: 60%; margin: 0 auto; border: 1px solid #ddd;">
                  <h2 style="color: #4CAF50;">Welcome, ${name}!</h2>
                  <p style="color: #555;">Thank you for signing up for our project! We're excited to have you onboard.</p>
                  <p style="color: #555;">If you did not sign up for this account, please ignore this email.</p>
                  <br />
                  <p style="font-size: 14px; color: #777;">Best regards,<br><span style="color: #4CAF50;">The Team BookMyResource</span></p>
                  <hr style="border: 0; border-top: 1px solid #ddd;" />
                  <footer style="text-align: center; font-size: 12px; color: #888;">This is an automated message. Please do not reply.</footer>
                </div>
        `,
  });
  console.log("Message sent: %s", info);
}

export default sendEmail;