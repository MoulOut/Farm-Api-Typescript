import * as add from './Add';
import * as getAll from './GetAll';
import * as getById from './GetById';
import * as removeById from './RemoveById';
import * as updateById from './UpdateById';

export const PacientesController = {
  ...add,
  ...getAll,
  ...getById,
  ...removeById,
  ...updateById,
};