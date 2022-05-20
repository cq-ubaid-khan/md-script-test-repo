import { Request, Response, NextFunction } from "express";
import knex from "../../base/database/knex";
import MessageModel from "../../base/error/MessageModel";
import UserDao from "./UserDao";

class UserCtr {
  public static async getAllUsers(
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      await knex.transaction(async (trx) => res.json(await UserDao.getAll(trx, ["id", "username"])));
    } catch (e) {
      next(e);
    }
  }

  public static async addUser(
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      res.json(new MessageModel("The user has been added!"));
    } catch (e) {
      next(e);
    }
  }
}

export default UserCtr;
