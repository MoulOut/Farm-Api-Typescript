import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { Usuario } from '../../models';

export const register = async (
  usuario: Omit<Usuario, 'id'>
): Promise<number | Error> => {
  try {
    const [newUser] = await Knex(ETableNames.usuario).insert(usuario).returning('id');

    if(typeof newUser === 'object'){
      return newUser.id;
    } else if (typeof newUser === 'number') {
      return newUser;
    }

    return new Error('Erro ao cadastrar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao cadastrar o usuario');
  }
};
