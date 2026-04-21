import nodemailer from "nodemailer";

export const sendResetEmail = async (to, resetLink) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    },
  });

  const message = {
    from: '"HortaComm" <no-reply@hortacomm.com>', // remetente
    to, // destinatário
    subject: "Redefinição de senha - HortaComm",
    html: `
      <p>Você solicitou redefinir sua senha.</p>
      <p>Clique no link abaixo para criar uma nova senha:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>Este link expira em 1 hora.</p>
    `,
  };

  await transporter.sendMail(message);
};


