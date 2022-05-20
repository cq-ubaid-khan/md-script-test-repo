import BaseModel from "../../base/model/BaseModel";

class UserModel extends BaseModel {
  static TABLE_NAME = "users";

  constructor(
     public username: string,
     public password: string,
     id?: string,
  ) {
    super(id);
  }

  static col(k: keyof UserModel, prefix = true): string {
    return prefix ? `${UserModel.TABLE_NAME}.${k}` : k;
  }
}

export default UserModel;
