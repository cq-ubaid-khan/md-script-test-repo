import * as Knex from "knex";
import { QueryBuilder } from "knex";
import UserModel from "../../../../modules/user/UserModel";

const { TABLE_NAME, col } = UserModel;

export async function up(knex: Knex): Promise<QueryBuilder> {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable(TABLE_NAME, (table) => {
      table
        .uuid("id")
        .primary()
        .defaultTo(knex.raw("uuid_generate_v4()"))
        .notNullable();
      table.string(col("username")).unique();
      table.string(col("password", false)).notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
