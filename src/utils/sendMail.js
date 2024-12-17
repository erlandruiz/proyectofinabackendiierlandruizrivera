import nodemailer from "nodemailer";
import envsConfig from "../config/envs.config.js";

export const sendMail = async (name, subject, to ) => {
  // se ocupa de conectar las conexiones y el servicio que vamos a utilizar
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
      user: "erlandruizdeveloper@gmail.com",
      pass: envsConfig.GMAIL_APP_PASS,
    },
  });

  //Configurar el envio del correo electronico

  await transporter.sendMail({
    from: "erlandruizdeveloper@gmail.com",
    to: to,
    subject: subject,
    // text: "Este es un primer email de prueba"
    html: `<h1>Bienvenido ${name}</h1>
<div>
    <p>Curso de Backend</p>
    <img src= "cid:robot"/>
</div>`,
attachments:[
    {
        filename:"robot.jpg",
        path:"public/images/robot.jpg",
        cid:"robot"
    }
]
  });
};

export const sendTicketMail = async (  to, ticket ) => {
  // se ocupa de conectar las conexiones y el servicio que vamos a utilizar
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
      user: "erlandruizdeveloper@gmail.com",
      pass: envsConfig.GMAIL_APP_PASS,
    },
  });

  //Configurar el envio del correo electronico

  await transporter.sendMail({
    from: "erlandruizdeveloper@gmail.com",
    to: to,
    subject: `Ticket de compra`,
    // text: "Este es un primer email de prueba"
    html: `<h1>Ticket de compra</h1>
<div>
    <p>Total de compra :$${ticket.amount}</p>
    <p>Código: ${ticket.code}</p>
</div>`,

  });
};
