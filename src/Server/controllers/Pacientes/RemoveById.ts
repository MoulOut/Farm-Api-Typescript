import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';
import { PacientesProvider } from '../../database/providers/pacientes';

interface Params {
  id?: number;
}

export const removeByIdValidation = validation((getSchema) => ({
  params: getSchema<Params>(yup.object().shape({
    id: yup.number().required().moreThan(0)
  }))
}));

export const removeById = async (req: Request<Params>, res: Response) => {
  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'Parametro Id precisa ser informado.',
      },
    });
  }
  
  const removePaciente = await PacientesProvider.removeById(req.params.id);

  if (removePaciente instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: removePaciente.message
      }
    });
  }

  return res.status(StatusCodes.NO_CONTENT).json(removePaciente);
};
