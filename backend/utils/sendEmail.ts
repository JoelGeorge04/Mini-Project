import nodemailer from 'nodemailer';

const sendEmail = async(email:string,name:string,token:string) => {

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, 
        auth: {
          user: process.env.NODEMAILER_EMAIL,
          pass: process.env.NODEMAILER_PASS,
        },
      });   

      const link = `${process.env.APP_URL}/verify?token=${token}`;

      const info = await transporter.sendMail({
        from: '"Mini Project" <joelgeorge40022gmail.com>', 
        to: email, 
        subject: "Mini Project Team", 
        text: "Hello world?", 
        html: `<div><h2>Hi, ${name}</h2><br><h3>Welcome to our Project!</h3><p>Click here to verify your email --><a href=${link}>Click here!</a></p></div>`, 
      });
      console.log("Message sent: %s", info);
}

export default sendEmail;