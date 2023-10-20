import { Router } from 'express';
import { MedicamentosController } from '../controllers/Medicamentos';

const router = Router();

router.get('/', (_, res) => {
  return res.send('Seja bem vindo a API de Farmácia');
});

router.get(
  '/medicamentos',
  MedicamentosController.getAllValidation,
  MedicamentosController.getAll
);

router.post(
  '/medicamentos',
  MedicamentosController.addValidation,
  MedicamentosController.add
);

router.delete(
  '/medicamentos/:id',
  MedicamentosController.removeByIdValidation,
  MedicamentosController.removeById
);

router.get(
  '/medicamentos/:id',
  MedicamentosController.getByIdValidation,
  MedicamentosController.getById
);

router.put(
  '/medicamentos/:id',
  MedicamentosController.updateByIdValidation,
  MedicamentosController.updateById
);

export { router };
