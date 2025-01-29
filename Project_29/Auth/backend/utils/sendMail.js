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


    const info = await transporter.sendMail({
      from: '"BookMyResource Team" <joelgeorge4002@gmail.com>',
      to: email,
      subject: "BookMyResource Team",
      text: `Hello ${name},\nThank you for signing up!`,
      html: `
                    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f9; padding: 30px; border-radius: 10px; width: 80%; max-width: 600px; margin: 0 auto; border: 1px solid #ccc; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                      <h2 style="color: #4CAF50; font-size: 24px; margin-bottom: 20px;">Welcome, ${name}!</h2>
                      <p style="color: #555; font-size: 16px; margin-bottom: 20px;">Thank you for signing up for our project! We're excited to have you onboard.</p>
                      <p style="color: #555; font-size: 16px; margin-bottom: 30px;">If you did not sign up for this account, please ignore this email.</p>
                      <br />
                      <p style="font-size: 14px; color: #777; margin-top: 20px;">Best regards,<br><span style="color: #4CAF50;">The Team BookMyResource</span></p>
                      <hr style="border: 0; border-top: 1px solid #ddd; margin: 20px 0;" />
                      <footer style="text-align: center; font-size: 12px; color: #888;">This is an automated message. Please do not reply.</footer>
                    </div>

              `,
    });
    console.log("Message sent: %s", info);
  }

  export default sendEmail;