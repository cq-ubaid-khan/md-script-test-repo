import EnvConfig, { APP_ENV } from "./envConfigLoader";

export const env: APP_ENV | string = process.env.NODE_ENV
  ? process.env.NODE_ENV
  : "development";
export const AppEnv = EnvConfig.getEnvConfig(env as APP_ENV);
