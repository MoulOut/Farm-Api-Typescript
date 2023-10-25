import { Request, Response } from 'express';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import { Usuario } from '../../database/models';
import { validation } from '../../shared/middlewares';
import { UsuariosProviders } from '../../database/providers/usuarios';

interface Body extends Omit<Usuario, 'id'> {}

export const SignUpValidation = validation((getSchema) => ({
  body: getSchema<Body>(
    yup.object().shape({
      nome: yup.string().required().min(3),
      email: yup.string().required().email().min(5),
      senha: yup.string().required().min(6).max(150),
    })
  ),
}));
export const signUp = async (req: Request<{}, {}, Body>, res: Response) => {
  const register = await UsuariosProviders.register(req.body);

  if (register instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: register.message,
      },
    });
  }

  return res.status(StatusCodes.OK).json(register);
};
