import { Request, Response, Errback, NextFunction } from "express";
import BaseError from "./base/error/BaseError";
import MessageModel from "./base/error/MessageModel";
import preAppLoader from "./base/loaders/preAppLoader";
import AppRouter from "./modules/AppRoutes";

const expressInstance = preAppLoader({
  databaseEnabled: false,
  sessionEnabled: true,
});

expressInstance.use("/api", AppRouter);

expressInstance.use(
  (err: Errback, _req: Request, res: Response, _next: NextFunction) => {
    console.log(err);
    if ("getErrorCode" in err) {
      const e = err as unknown as BaseError;
      res.status(e.getErrorCode()).json(new MessageModel(e.getErrorMessage()));
    } else {
      res.status(422).json({
        message: "There is an error occurred, Sorry for inconvenience",
      });
    }
  }
);

export default expressInstance;
