import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { Medicamentos } from '../../database/models';

interface Body extends Omit<Medicamentos, 'id'> {}

interface Params {
  id?: number;
}

export const updateByIdValidation = validation((getSchema) => ({
  params: getSchema<Params>(
    yup.object().shape({
      id: yup.number().required().moreThan(0),
    })
  ),
  body: getSchema<Body>(
    yup.object().shape({
      nome: yup.string().required(),
      classe: yup.string().required(),
    })
  ),
}));

export const updateById = (req: Request<Params, {}, Body>, res: Response) => {
  res.status(StatusCodes.OK).json('Not implemented yet.');
};
