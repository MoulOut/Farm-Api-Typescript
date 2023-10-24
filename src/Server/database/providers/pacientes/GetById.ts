import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { Paciente } from '../../models';

export const getById = async (id: number): Promise<Paciente | Error> => {
  try {
    const pacienteToGet = await Knex(ETableNames.paciente)
      .select('*')
      .where('id', '=', id)
      .first();

    if (pacienteToGet) return pacienteToGet;

    return new Error('Erro ao consultar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar o registro.');
  }
};
