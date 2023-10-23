import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { Medicamentos } from '../../database/models';
import { MedicamentosProvider } from '../../database/providers/medicamentos';

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

export const updateById = async (req: Request<Params, {}, Body>, res: Response) => {
  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'Parametro Id precisa ser informado',
      },
    });
  }

  const updateMed = await MedicamentosProvider.updateByid(req.params.id,req.body);

  if (updateMed instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: updateMed.message
      }
    });
  }

  res.status(StatusCodes.NO_CONTENT).json(updateMed);
};
