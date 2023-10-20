import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.medicamento, (table) => {
      table.bigIncrements('id').primary().index();
      table.string('nome', 150).index().notNullable();
      table.string('classe').index().notNullable();

      table.comment('Tabela usada para armazenar medicamentos no sistema');
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.medicamento}`);
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.medicamento).then(() => {
    console.log(`# Dropped table ${ETableNames.medicamento}`);
  });
}
