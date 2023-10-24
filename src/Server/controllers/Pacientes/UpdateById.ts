import { Request, Response } from 'express';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import { Paciente } from '../../database/models';
import { validation } from '../../shared/middlewares';
import { PacientesProvider } from '../../database/providers/pacientes';

interface Body extends Omit<Paciente, 'id'> {}

interface Params {
  id?: number;
}

export const updateByIdValidation = validation((getSchema) => ({
  body: getSchema<Body>(
    yup.object().shape({
      nomeCompleto: yup.string().required(),
      medicamentosId: yup.lazy((val) =>
        Array.isArray(val)
          ? yup.array().of(yup.number().required()).required()
          : yup.number().required()
      ),
    })
  ),
  params: getSchema<Params>(
    yup.object().shape({
      id: yup.number().required().moreThan(0),
    })
  ),
}));

export const updateById = async (
  req: Request<Params, {}, Body>,
  res: Response
) => {
  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'Parametro Id precisa ser informado.',
      },
    });
  }

  const updatePaciente = await PacientesProvider.updateById(req.params.id, req.body);

  if (updatePaciente instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: updatePaciente.message
      }
    });
  }

  return res.status(StatusCodes.NO_CONTENT).json(updatePaciente);
};
