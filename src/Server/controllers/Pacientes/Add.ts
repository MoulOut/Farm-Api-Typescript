import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { Paciente } from '../../database/models';
import { validation } from '../../shared/middlewares';

interface Body extends Omit<Paciente, 'id'> {}

export const addValidation = validation((getSchema) => ({
  body: getSchema<Body>(
    yup.object().shape({
      nomeCompleto: yup.string().required().min(3),
      medicamentosId: yup.array().required().min(1),
    })
  ),
}));

export const add = async (req: Request<{}, {}, Body>, res: Response) => {
  return res.status(StatusCodes.OK).json('Not implemented yet.');
};
