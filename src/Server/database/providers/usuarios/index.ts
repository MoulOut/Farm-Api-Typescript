import * as getByEmail from './GetByEmail';
import * as register from './Register';

export const UsuariosProviders = {
  ...register,
  ...getByEmail
};