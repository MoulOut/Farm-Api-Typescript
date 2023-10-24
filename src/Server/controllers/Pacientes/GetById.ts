import { Request, Response } from 'express';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import { validation } from '../../shared/middlewares';
import { PacientesProvider } from '../../database/providers/pacientes';

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
        default: 'Parametro Id precisa ser informado.',
      },
    });
  }

  const getPaciente = await PacientesProvider.getById(req.params.id);

  if (getPaciente instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: getPaciente.message,
      },
    });
  }

  return res.status(StatusCodes.OK).json(getPaciente);
};
