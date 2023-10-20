import * as add from './Add';
import * as count from './Count';
import * as getAll from './GetAll';
import * as getById from './GetById';
import * as removeById from './RemoveById';
import * as updateByid from './UpdateById';


export const MedicamentosProvider = {
  ...add,
  ...count,
  ...getAll,
  ...getById,
  ...removeById,
  ...updateByid,
};