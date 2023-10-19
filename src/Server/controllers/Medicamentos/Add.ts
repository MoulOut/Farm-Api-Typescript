import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Medicamentos } from '../../database/models';

interface Body extends Omit<Medicamentos, 'id'> {}

export const add = async (req: Request<{}, {}, Body>, res: Response) => {

  return res
    .status(StatusCodes.CREATED)
    .json(`Medicamento ${req.body.nome} cadastrado no sistema.`);
};
