import { Request, Response } from 'express';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import { Medicamentos } from '../../database/models';
import { validation } from '../../shared/middlewares';
import { MedicamentosProvider } from '../../database/providers/medicamentos';

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
  const addMed = await MedicamentosProvider.add(req.body);

  if (addMed instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: addMed.message,
      },
    });
  }
  
  res.status(StatusCodes.CREATED).json(addMed);
};
