import { Request, Response } from 'express';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import { validation } from '../../shared/middlewares';
import { PacientesProvider } from '../../database/providers/pacientes';

interface Query {
  page?: number;
  limit?: number;
  filter?: string;
}

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<Query>(
    yup.object().shape({
      page: yup.number().optional().moreThan(0),
      limit: yup.number().optional().moreThan(0),
      filter: yup.string().optional().default(''),
    })
  ),
}));

export const getAll = async (
  req: Request<{}, {}, {}, Query>,
  res: Response
) => {
  const getAllPacientes = await PacientesProvider.getAll(
    req.query.page || 1,
    req.query.limit || 10,
    req.query.filter || ''
  );
  const countPacientes = await PacientesProvider.count(req.query.filter);

  if (getAllPacientes instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: getAllPacientes.message,
      },
    });
  } else if (countPacientes instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: countPacientes.message,
      },
    });
  }

  res.setHeader('access-control-expose-headers', 'x-total-count');
  res.setHeader('x-total-count', countPacientes);

  return res.status(StatusCodes.OK).json(getAllPacientes);
};
