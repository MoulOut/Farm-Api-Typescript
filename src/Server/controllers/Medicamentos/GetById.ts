import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { MedicamentosProvider } from '../../database/providers/medicamentos';

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
  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'Parametro Id precisa ser informado.'
      },
    });
  }
  const getMedById = await MedicamentosProvider.getById(req.params.id);

  if (getMedById instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: getMedById.message,
      },
    });
  }

  return res.status(StatusCodes.OK).json(getMedById);
};
