import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.paciente, (table) => {
      table.bigIncrements('id').primary().index();
      table.string('nomeCompleto').index().notNullable();
      table
        .integer('medicamentosId')
        .index()
        .notNullable()
        .references('id')
        .inTable(ETableNames.medicamento)
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');

      table.comment('Tabela usada para armazenar pacientes no sistema');
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.paciente}`);
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.paciente).then(() => {
    console.log(`# Dropped table ${ETableNames.paciente}`);
  });
}
