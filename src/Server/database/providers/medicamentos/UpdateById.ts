import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { Medicamentos } from '../../models';

export const updateByid = async (
  id: number,
  medicamento: Omit<Medicamentos, 'id'>
): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.medicamento)
      .update(medicamento)
      .where('id', '=', id);

    if (result > 0) return;

    return new Error('Erro ao atualizar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao atualizar o registro');
  }
};
