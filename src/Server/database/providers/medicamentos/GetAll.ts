import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { Medicamentos } from '../../models';

export const getAll = async (
  page: number,
  limit: number,
  filter: string,
  id = 0
): Promise<Medicamentos[] | Error> => {
  try {
    const allMed = await Knex(ETableNames.medicamento)
      .select('*')
      .where('id', Number(id))
      .orWhere('nome', 'like', `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    if (id > 0 && allMed.every((item) => item.id !== id)) {
      const medById = await Knex(ETableNames.medicamento)
        .select('*')
        .where('id', '=', id)
        .first();

      if (medById) return [...allMed, medById];
    }

    return allMed;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar os registros');
  }
};
