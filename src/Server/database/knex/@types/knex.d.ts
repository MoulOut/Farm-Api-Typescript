import { Medicamentos, Paciente, Usuario } from '../../models';

declare module 'knex/types/tables' {
  interface Tables {
    medicamento: Medicamentos;
    paciente: Paciente;
    usuario: Usuario;
  }
}
