import express from 'express';

const server = express();

server.get('/', (_, res) => {
  return res.send('Seja bem vindo a API de Farmácia');
});

export { server };
