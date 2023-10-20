import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';

interface Params {
  id?: number;
}

export const getByIdValidation = validation((getSchema) => ({
  params: getSchema<Params>(yup.object().shape({
    id: yup.number().required().moreThan(0)
  }))
}));

export const getById = (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json('Not implemented yet.');
};
