import { Request, Response } from 'express';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import { validation } from '../../shared/middlewares';

interface Params {
  id?: number;
}

export const getByIdValidation = validation((getSchema) => ({
  params: getSchema<Params>(
    yup.object().shape({
      id: yup.number().required().moreThan(0),
    })
  ),
}));

export const getById = async (req: Request<Params>, res: Response) => {
  return res.status(StatusCodes.OK).json('Not implemented yet.');
};
