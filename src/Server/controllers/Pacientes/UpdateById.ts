import { Request, Response } from 'express';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import { Paciente } from '../../database/models';
import { validation } from '../../shared/middlewares';

interface Body extends Omit<Paciente, 'id'> {}

interface Params {
  id?: number;
}

export const updateByIdValidation = validation((getSchema) => ({
  body: getSchema<Body>(
    yup.object().shape({
      nomeCompleto: yup.string().required(),
      medicamentosId: yup.lazy(val => (Array.isArray(val) ? yup.array().of(yup.number().required()).required() : yup.number().required()))
    })
  ),
  params: getSchema<Params>(
    yup.object().shape({
      id: yup.number().required().moreThan(0),
    })
  ),
}));

export const updateById = async (req: Request<Params,{},Body>, res: Response) => {
  return res.status(StatusCodes.OK).json('Not implemented yet.');
};
