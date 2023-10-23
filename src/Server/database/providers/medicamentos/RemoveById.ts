import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';

export const removeById = async (id: number): Promise<void | Error> => {
  try {
    const medToRemove = await Knex(ETableNames.medicamento).where('id', '=', id).del();

    if (medToRemove > 0) return;

    return new Error('Erro ao apagar o registro.');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao apagar o registro');
  }
};
