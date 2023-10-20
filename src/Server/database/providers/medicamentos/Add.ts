import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { Medicamentos } from '../../models';

export const add = async (
  medicamento: Omit<Medicamentos, 'id'>
): Promise<number | Error> => {
  try {
    const [result] = await Knex(ETableNames.medicamento).insert(medicamento).returning('id');


    if (typeof result === 'object') {
      return result.id;
    } else if (typeof result === 'number') {
      return result;
    }
    return new Error('Erro ao cadastrar o registro.');
  } catch (error) {
    console.log(error);
    
    return new Error('Erro ao cadastrar o registro.');
  }
};
