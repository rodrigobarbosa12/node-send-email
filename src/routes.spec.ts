import request from 'supertest';
import app from './app';

describe('Testando rota', () => {
  it('deve ser possivel enviar um e-mail', async () => {
    const response = await request(app)
      .post('/send-email')
      .send({ email: 'example@example.com' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toStrictEqual('E-mail enviado!');
  });

  it('Erro quando não informar um e-mail', async () => {
    const response = await request(app)
      .post('/send-email')
      .send({ email: '' });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toStrictEqual('Email é obrigatório');
  });
});
