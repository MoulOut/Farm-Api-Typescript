import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';

interface Params {
  id?: number;
}

export const removeByIdValidation = validation((getSchema) => ({
  params: getSchema<Params>(yup.object().shape({
    id: yup.number().required().moreThan(0)
  }))
}));

export const removeById = async (req: Request<Params>, res: Response) => {
  return res.status(StatusCodes.OK).json('Not implemented yet.');
};
