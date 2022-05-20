// eslint-disable-next-line import/no-unresolved
import { SessionUserType } from "../../src/modules/shared/types/SharedTypes";

export declare module "express-session" {
  export interface SessionData {
    user: SessionUserType;
  }
}
