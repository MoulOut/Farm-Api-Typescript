import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { MedicamentosProvider } from '../../database/providers/medicamentos';

interface Params {
  id?: number;
}

export const removeByIdValidation = validation((getSchema) => ({
  params: getSchema<Params>(yup.object().shape({
    id: yup.number().required().moreThan(0)
  }))
}));

export const removeById = async (req: Request<Params>, res: Response) => {
  if (!req.params.id){
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'Parametro Id precisa ser informado.'
      }
    });
  }

  const RemoveMed = await MedicamentosProvider.removeById(req.params.id);
  
  if (RemoveMed instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: RemoveMed.message
      }
    });
  }

  return res.status(StatusCodes.NO_CONTENT).json(RemoveMed);
};
