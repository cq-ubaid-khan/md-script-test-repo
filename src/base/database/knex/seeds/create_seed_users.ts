import * as Knex from "knex";
import UserDao from "../../../../modules/user/UserDao";
import Bcrypt from "../../../service/Bcrypt";

// eslint-disable-next-line import/prefer-default-export
export async function seed(knex: Knex): Promise<any> {
  return knex.transaction(async (trx) => {
    await new UserDao().upsertMany(trx, [
      {
        id: "8c9c08ab-489d-4b40-8bcf-8662f5f578f8",
        username: "1",
        password: await Bcrypt.bcryptHash("2"),
      },
    ]);
  });
}
