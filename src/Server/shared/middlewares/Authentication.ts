import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

export const authentication: RequestHandler = async (req, res, next) => {
  const { authorization } = req.headers;
  console.log(req.headers);

  if (!authorization) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Não autenticado.',
      },
    });
  }

  console.log(authorization);

  const [type, token] = authorization.split(' ');

  if (type !== 'Bearer') {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Não autenticado.',
      },
    });
  }

  if (token !== 'testeToken') {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Token invalido.',
      },
    });
  }

  

  return next();
};
