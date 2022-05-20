import { QueryBuilder, Transaction } from "knex";
import BaseModel from "../model/BaseModel";

type defaultOperators = "=" | "LIKE";

class BaseDao<
  Model extends BaseModel,
  TblCols extends string | number | symbol = keyof Model
> {
  protected tableName: string;

  protected returnedCols = "*";

  protected col(c: TblCols): TblCols {
    return c;
  }

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  getAll<Model>(
    trx: Transaction,
    fields: TblCols[] | string = "*"
  ): QueryBuilder<Model[], Model[]> {
    return trx(this.tableName).select(fields);
  }

  findAllByCol(
    trx: Transaction,
    colName: TblCols,
    value: string,
    fields: TblCols[] | string = "*",
    operator: defaultOperators = "="
  ): QueryBuilder<Model[], Model[]> {
    return trx(this.tableName)
      .select(fields)
      .where(colName as string, operator, value) as QueryBuilder<
      Model[],
      Model[]
    >;
  }

  findAllByPredicate(
    trx: Transaction,
    predicate: Partial<Model>,
    fields: TblCols[] | string = "*"
  ): QueryBuilder<Model[], Model[]> {
    return trx(this.tableName).select(fields).where(predicate) as QueryBuilder<
      Model[],
      Model[]
    >;
  }

  findOneByCol(
    trx: Transaction,
    colName: TblCols,
    value: string,
    fields: TblCols[] | string = "*"
  ): QueryBuilder<Model, Model> {
    return trx(this.tableName)
      .where(colName as string, value)
      .first(fields);
  }

  findOneByPredicate(
    trx: Transaction,
    predicate: Partial<Model>,
    fields: TblCols[] | string = "*"
  ): QueryBuilder<Model, Model> {
    return trx(this.tableName).where(predicate).first(fields);
  }

  findOneById(trx: Transaction, id: string): QueryBuilder<Model, Model> {
    return this.findOneByCol(trx, "id" as TblCols, id);
  }

  insertMany(
    trx: Transaction,
    models: Model[] | Model
  ): QueryBuilder<Model[], Model[]> {
    return trx(this.tableName).insert(models).returning(this.returnedCols);
  }

  insertOne(trx: Transaction, model: Model): QueryBuilder<Model[], Model[]> {
    return this.insertMany(trx, model).limit(1);
  }

  updateOneByColName(
    trx: Transaction,
    model: Partial<Model>,
    colName: TblCols,
    colValueByUpdate: string
  ): QueryBuilder<Model[], Model[]> {
    return trx(this.tableName)
      .update(model)
      .where(colName as string, colValueByUpdate)
      .limit(1)
      .returning(this.returnedCols) as QueryBuilder<Model[], Model[]>;
  }

  updateOneByPredicate(
    trx: Transaction,
    model: Partial<Model>,
    predicate: Partial<Model>
  ): QueryBuilder<Model[], Model[]> {
    return trx(this.tableName)
      .update(model)
      .where(predicate)
      .limit(1)
      .returning(this.returnedCols) as QueryBuilder<Model[], Model[]>;
  }

  updateOneById(
    trx: Transaction,
    model: Partial<Model>,
    id: string
  ): QueryBuilder<Model[], Model[]> {
    return this.updateOneByColName(
      trx,
      model as Required<Model>,
      "id" as TblCols,
      id
    );
  }

  deleteOneByCol(
    trx: Transaction,
    col: TblCols,
    val: string
  ): QueryBuilder<number> {
    return trx(this.tableName)
      .del()
      .limit(1)
      .where(col as string, val);
  }

  deleteOneById(trx: Transaction, id: string): QueryBuilder<number> {
    return this.deleteOneByCol(trx, "id" as TblCols, id);
  }

  deleteAllByCol(
    trx: Transaction,
    col: TblCols,
    val: string
  ): QueryBuilder<number> {
    return trx(this.tableName)
      .del()
      .where(col as string, val);
  }

  upsertMany(
    trx: Transaction,
    models: Model[] | Model | Partial<Model>,
    conflictConstraint: TblCols[] | string = "id"
  ): QueryBuilder<Model[], Model[]> {
    return trx(this.tableName)
      .insert(models)
      .onConflict(conflictConstraint as string)
      .merge()
      .returning(this.returnedCols);
  }

  upsertManyByCol(
    trx: Transaction,
    models: Model[] | Model | Partial<Model>,
    colName: TblCols,
    colValueByUpdate: string,
    conflictConstraint: TblCols[] | string = "id"
  ): QueryBuilder<Model[], Model[]> {
    return this.upsertMany(trx, models, conflictConstraint).where(
      `${this.tableName}.${colName}`,
      colValueByUpdate
    );
  }
}

export default BaseDao;
