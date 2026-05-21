import mustache from "mustache";
import { createTransport } from "nodemailer";
import { environmentConfig } from "../config";
import Mail from "nodemailer/lib/mailer";

const { host, from, pass, user, port } = environmentConfig["node-mailer"];

const transporter = createTransport({
  host,
  port,
  secure: port === 465,
  auth: {
    user,
    pass,
  },
  pool: true,
  maxConnections: 5,
  maxMessages: 100,
});

export const sendMail = async (mailOptions: Mail.Options): Promise<void> => {
  const options: Mail.Options = {
    ...mailOptions,
    from: mailOptions.from || `${from} <${user}>`,
  };

  try {
    await transporter.sendMail(options);
  } catch (error) {
    console.error("Error en sendMail [Nodemailer]:", error);
    throw error;
  }
};

export const renderHtmlTemplate = (
  template: string,
  view: Record<string, any>
): string => mustache.render(template, view);
