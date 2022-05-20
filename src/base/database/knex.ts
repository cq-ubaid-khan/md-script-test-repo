import knex from "knex";
import { AppEnv } from "../loaders/baseLoader";

export default knex(AppEnv.knex);
