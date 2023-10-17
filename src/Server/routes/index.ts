import { Router } from 'express';

const router = Router();

router.get('/', (_, res) => {
  return res.send('Seja bem vindo a API de Farmácia');
});



export { router };
