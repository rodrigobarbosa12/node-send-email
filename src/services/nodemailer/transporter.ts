import nodemailer, { SentMessageInfo } from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';

export type ObjectGeneric = { [x: string]: string | number | null };

const transporter = nodemailer.createTransport({
  host: '',
  port: 465,
  secure: true,
  auth: {
    user: '',
    pass: '',
  },
  tls: {
    ciphers: 'SSLv3',
  },
});

interface SendEmail {
  to: string;
  subject: string;
  text?: string;
  template: [string] | [string, ObjectGeneric];
}

const getTemplate = (params: [string] | [string, ObjectGeneric]) => {
  const [templateName, replacements] = params;
  const filePath = `${__dirname}/templates/${templateName}.html`;
  const html = fs.readFileSync(filePath, 'utf-8').toString();
  const template = handlebars.compile(html);
  return template(replacements);
};

const sendEmail = ({
  to,
  subject,
  text,
  template,
}: SendEmail): Promise<SentMessageInfo> => transporter.sendMail({
  from: '',
  to,
  subject,
  text,
  html: getTemplate(template),
});

export default sendEmail;
