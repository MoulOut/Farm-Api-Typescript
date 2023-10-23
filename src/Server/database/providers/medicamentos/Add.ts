import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { Medicamentos } from '../../models';

export const add = async (
  medicamento: Omit<Medicamentos, 'id'>
): Promise<number | Error> => {
  try {
    const [medToAdd] = await Knex(ETableNames.medicamento).insert(medicamento).returning('id');


    if (typeof medToAdd === 'object') {
      return medToAdd.id;
    } else if (typeof medToAdd === 'number') {
      return medToAdd;
    }
    return new Error('Erro ao cadastrar o registro.');
  } catch (error) {
    console.log(error);
    
    return new Error('Erro ao cadastrar o registro.');
  }
};
