import { Request, Response } from 'express';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import { Medicamentos } from '../../database/models';
import { validation } from '../../shared/middlewares';

interface Body extends Omit<Medicamentos, 'id'> {}

export const addValidation = validation((getSchema) => ({
  body: getSchema<Body>(
    yup.object().shape({
      nome: yup.string().required().min(2),
      classe: yup.string().required().min(3),
    })
  ),
}));

export const add = async (req: Request<{}, {}, Body>, res: Response) => {
  console.log(req.body);

  return res
    .status(StatusCodes.CREATED)
    .json(`Medicamento ${req.body.nome} cadastrado no sistema.`);
};
