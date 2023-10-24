import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { Paciente } from '../../models';

export const updateById = async (
  id: number,
  paciente: Omit<Paciente, 'id'>
): Promise<void | Error> => {
  try {
    const pacienteToUpdate = await Knex(ETableNames.paciente)
      .update(paciente)
      .where('id ', '=', id);

    if (pacienteToUpdate > 0) return;

    return new Error('Erro ao atualizar o registro');
  } catch (error) {
    console.log(error);

    return new Error('Erro ao atualizar o registro.');
  }
};
