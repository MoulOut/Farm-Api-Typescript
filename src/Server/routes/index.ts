import { Router } from 'express';
import { MedicamentosController } from '../controllers/Medicamentos';

const router = Router();

router.get('/', (_, res) => {
  return res.send('Seja bem vindo a API de Farmácia');
});

router.post(
  '/medicamentos',
  MedicamentosController.addValidation,
  MedicamentosController.add
);

export { router };
