import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { Paciente } from '../../database/models';
import { validation } from '../../shared/middlewares';
import { PacientesProvider } from '../../database/providers/pacientes';

interface Body extends Omit<Paciente, 'id'> {}

export const addValidation = validation((getSchema) => ({
  body: getSchema<Body>(
    yup.object().shape({
      nomeCompleto: yup.string().required().min(3),
      medicamentosId: yup.lazy((val) =>
        Array.isArray(val)
          ? yup.array().of(yup.number().required()).required()
          : yup.number().required()
      ),
    })
  ),
}));

export const add = async (req: Request<{}, {}, Body>, res: Response) => {
  const addPaciente = await PacientesProvider.add(req.body);

  if (addPaciente instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: addPaciente.message,
      },
    });
  }
  
  return res.status(StatusCodes.CREATED).json(addPaciente);
};
