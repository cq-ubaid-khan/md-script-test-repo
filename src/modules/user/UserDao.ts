import BaseDao from "../../base/dao/BaseDao";
import UserModel from "./UserModel";

class UserDao extends BaseDao<UserModel> {
  constructor() {
    super(UserModel.TABLE_NAME);
  }
}

export default new UserDao();
