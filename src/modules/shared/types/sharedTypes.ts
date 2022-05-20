import UserModel from "../../user/UserModel";

export type SessionUserType = Pick<UserModel, "id" | "username">;
