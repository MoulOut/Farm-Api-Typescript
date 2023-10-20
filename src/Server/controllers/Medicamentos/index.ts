import * as add from './Add';
import * as getAll from './GettAll';
import * as getById from './GetById';
import * as removeById from './RemoveById';
import * as updateById from './UpdateById';

export const MedicamentosController = {
  ...add,
  ...getAll,
  ...getById,
  ...removeById,
  ...updateById,
};
