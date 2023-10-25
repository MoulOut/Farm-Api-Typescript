import { Request, Response } from 'express';
import * as yup from 'yup';
import { Usuario } from '../../database/models';
import { StatusCodes } from 'http-status-codes';
import { validation } from '../../shared/middlewares';
import { UsuariosProviders } from '../../database/providers/usuarios';

interface Body extends Omit<Usuario, 'id' | 'nome'> {}

export const SignInValidation = validation((getSchema) => ({
  body: getSchema<Body>(
    yup.object().shape({
      email: yup.string().required().email().min(5),
      senha: yup.string().required().min(6).max(150),
    })
  ),
}));

export const SignIn = async (req: Request<{}, {}, Body>, res: Response) => {
  const user = await UsuariosProviders.getByEmail(req.body.email);

  if (user instanceof Error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Email ou Senha invalidos.',
      },
    });
  }

  if (req.body.senha !== user.senha) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Email ou senha invalidos.',
      },
    });
  }
  return res.status(StatusCodes.OK).json({accessToken: 'testeToken'});
};
