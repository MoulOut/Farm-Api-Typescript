import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { MedicamentosProvider } from '../../database/providers/medicamentos';

interface Query {
  id?: number;
  page?: number;
  limit?: number;
  filter?: string;
}

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<Query>(
    yup.object().shape({
      page: yup.number().optional().moreThan(0),
      limit: yup.number().optional().moreThan(0),
      filter: yup.string().optional(),
      id: yup.number().integer().optional().default(0),
    })
  ),
}));

export const getAll = async (
  req: Request<{}, {}, {}, Query>,
  res: Response
) => {
  const getAllMed = await MedicamentosProvider.getAll(
    req.query.page || 1,
    req.query.limit || 10,
    req.query.filter || '',
    Number(req.query.id || 0)
  );
  const countMed = await MedicamentosProvider.count(req.query.filter);

  if (getAllMed instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: getAllMed.message,
      },
    });
  } else if (countMed instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: countMed.message
      }
    });
  }
  
  res.setHeader('access-control-expose-headers','x-total-count');
  res.setHeader('x-total-count', countMed);

  return res.status(StatusCodes.ACCEPTED).json(getAllMed);
};
