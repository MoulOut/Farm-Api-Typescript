import { Router } from 'express';
import {
  MedicamentosController,
  PacientesController,
  UsuariosController,
} from '../controllers';
import { authentication } from '../shared/middlewares';

const router = Router();

router.get('/', (_, res) => {
  return res.send('Seja bem vindo a API de Farmácia');
});

router.get(
  '/medicamentos',
  authentication,
  MedicamentosController.getAllValidation,
  MedicamentosController.getAll
);

router.post(
  '/medicamentos',
  authentication,
  MedicamentosController.addValidation,
  MedicamentosController.add
);

router.delete(
  '/medicamentos/:id',
  authentication,
  MedicamentosController.removeByIdValidation,
  MedicamentosController.removeById
);

router.get(
  '/medicamentos/:id',
  authentication,
  MedicamentosController.getByIdValidation,
  MedicamentosController.getById
);

router.put(
  '/medicamentos/:id',
  authentication,
  MedicamentosController.updateByIdValidation,
  MedicamentosController.updateById
);

router.get(
  '/pacientes',
  authentication,
  PacientesController.getAllValidation,
  PacientesController.getAll
);

router.post(
  '/pacientes',
  authentication,
  PacientesController.addValidation,
  PacientesController.add
);

router.delete(
  '/pacientes/:id',
  authentication,
  PacientesController.removeByIdValidation,
  PacientesController.removeById
);

router.get(
  '/pacientes/:id',
  authentication,
  PacientesController.getByIdValidation,
  PacientesController.getById
);

router.put(
  '/pacientes/:id',
  authentication,
  PacientesController.updateByIdValidation,
  PacientesController.updateById
);

router.post(
  '/cadastrar',
  UsuariosController.SignUpValidation,
  UsuariosController.signUp
);

router.post(
  '/entrar',
  UsuariosController.SignInValidation,
  UsuariosController.SignIn
);

export { router };
