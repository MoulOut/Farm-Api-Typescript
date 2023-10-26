import { Request, Response } from 'express';
import * as yup from 'yup';
import { Usuario } from '../../database/models';
import { StatusCodes } from 'http-status-codes';
import { validation } from '../../shared/middlewares';
import { UsuariosProviders } from '../../database/providers/usuarios';
import { JWTSerivce, PassCrypto } from '../../shared/services';

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
  const { email, senha } = req.body;
  const user = await UsuariosProviders.getByEmail(email);

  if (user instanceof Error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Email ou Senha invalidos.',
      },
    });
  }

  const matchPass = await PassCrypto.verifyPassword(senha, user.senha);
  if (!matchPass) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Email ou senha invalidos.',
      },
    });
  }

  const accessToken = await JWTSerivce.signIn({ uid: user.id });
  if (accessToken === 'JWT_SECRET_NOT_FOUND') {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: 'Erro ao gerar o token de acesso.',
      },
    });
  }
  
  return res.status(StatusCodes.OK).json({ accessToken: accessToken });
};
