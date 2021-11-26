import sendEmail from './transporter';

describe('Enviando e-mail', () => {
  let email = '';

  beforeAll(() => {
    email = 'example@example.com';
  });

  jest.mock('nodemailer', () => ({
    createTransport: jest.fn().mockReturnValue({
      sendMail: jest.fn().mockReturnValue({
        accepted: [email],
        rejected: [],
        envelopeTime: 54,
        messageTime: 1039,
        messageSize: 14977,
        response: '250 2.0.0 Ok: queued as 34B9620076',
        envelope: {
          from: 'notificacao@aplicativoigreja.com.br',
          to: [email],
        },
        messageId: '<28643dd9-762b-1514-0e4a-8521d52663f4@aplicativoigreja.com.br>'
      })
    })
  }));

  it('Deve enviar e-mail com sucesso', async () => {
    const response = await sendEmail({
      to: email,
      subject: 'Teste de envio de e-mail',
      template: ['example', { title: 'Example' }],
    });

    expect(response).toHaveProperty('accepted');
    expect(response.accepted).toStrictEqual([email]);
  });
});

