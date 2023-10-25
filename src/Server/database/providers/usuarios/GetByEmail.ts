import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { Usuario } from '../../models';

export const getByEmail = async (email: string): Promise<Usuario | Error> => {
  try {
    const UserToGet = await Knex(ETableNames.usuario)
      .select('*')
      .where('email', '=', email)
      .first();

    if (UserToGet) return UserToGet;

    return new Error('Regsitro não encontrado.');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar o registro.');
  }
};
