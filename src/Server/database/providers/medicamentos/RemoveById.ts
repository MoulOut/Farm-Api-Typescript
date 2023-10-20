import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';

export const removeById = async (id: number): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.medicamento).where('id', '=', id).del();

    if (result > 0) return;

    return new Error('Erro ao apagar o registro.');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao apagar o registro');
  }
};
