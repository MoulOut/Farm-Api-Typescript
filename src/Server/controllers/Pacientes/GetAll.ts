import { Request, Response } from 'express';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import { validation } from '../../shared/middlewares';

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

export const getAll = async (req: Request<{}, {}>, res: Response) => {
  return res.status(StatusCodes.OK).json('Not implemented yet.');
};
