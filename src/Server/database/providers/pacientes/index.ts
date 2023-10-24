import * as add from './Add';
import * as count from './Count';
import * as getAll from './GetAll';
import * as getById from './GetById';
import * as removeById from './RemoveById';
import * as updateById from './UpdateById';

export const PacientesProvider = {
  ...add,
  ...count,
  ...getAll,
  ...getById,
  ...removeById,
  ...updateById,
};
