import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { Medicamentos } from '../../models';

export const getById = async (id: number): Promise<Medicamentos | Error> => {
  try {
    const medToGet = await Knex(ETableNames.medicamento)
      .select('*')
      .where('id', '=', id)
      .first();

    if (medToGet) return medToGet;

    return new Error('Registro não encontrado');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar o registro');
  }
};
