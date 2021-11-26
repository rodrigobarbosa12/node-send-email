import { Router, Request, Response } from 'express';
import sendEmail from './services/nodemailer/transporter';

const routes = Router();

routes.post('/send-email', async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email é obrigatório' });
    }

    await sendEmail({
      to: email,
      subject: 'Teste de envio de e-mail',
      template: ['example', { title: 'Example' }],
    });

    return res.json({ message: 'E-mail enviado!' });
  } catch (error) {
    return res.status(400).json(error);
  }
});

export default routes;
