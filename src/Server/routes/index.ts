import { Router } from 'express';
import { MedicamentosController,PacientesController } from '../controllers';

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

router.get(
  '/pacientes',
  PacientesController.getAllValidation,
  PacientesController.getAll
);

router.post(
  '/pacientes',
  PacientesController.addValidation,
  PacientesController.add
);

router.delete(
  '/pacientes/:id',
  PacientesController.removeByIdValidation,
  PacientesController.removeById
);

router.get(
  '/pacientes/:id',
  PacientesController.getByIdValidation,
  PacientesController.getById
);

router.put(
  '/pacientes/:id',
  PacientesController.updateByIdValidation,
  PacientesController.updateById
);

export { router };
