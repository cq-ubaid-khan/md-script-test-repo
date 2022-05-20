import express from "express";
import MessageModel from "../base/error/MessageModel";
import UserCtr from "./user/UserCtr";

const AppRouter = express.Router();

AppRouter.get("/users", UserCtr.getAllUsers);
AppRouter.post("/users", UserCtr.addUser);

AppRouter.get("/test", (_req, res) => res.json(new MessageModel("App is working!!!")));

export default AppRouter;
