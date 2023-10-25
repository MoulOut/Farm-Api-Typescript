import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { Paciente } from '../../models';

export const getAll = async (
  page: number,
  limit: number,
  filter: string
): Promise<Paciente[] | Error> => {
  try {
    const allPaciente = await Knex(ETableNames.paciente)
      .select('*')
      .where('nomeCompleto', 'like', `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);
    
    if( allPaciente.length === 0) {
      return new Error('Não há registros no banco de dados.');
    }
    
    return allPaciente;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar os registro.');
  }
};
