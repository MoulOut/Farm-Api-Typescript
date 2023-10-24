import { Paciente } from '../../models';
import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';

export const add = async (
  paciente: Omit<Paciente, 'id'>
): Promise<number | Error> => {
  try {
    const [pacienteToAdd] = await Knex(ETableNames.paciente)
      .insert(paciente)
      .returning('id');

    if (typeof pacienteToAdd === 'object') {
      return pacienteToAdd.id;
    } else if (typeof pacienteToAdd === 'number') {
      return pacienteToAdd;
    }

    return new Error('Erro ao cadastrar o registro.');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao cadastrar o registro.');
  }
};
