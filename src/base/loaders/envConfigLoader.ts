import DevelopmentConfig from "../../env/development.env";
import ProductionConfig from "../../env/production.env";

export type APP_ENV = "development" | "production";

class EnvConfig {
  static getEnvConfig(env: APP_ENV): typeof DevelopmentConfig {
    if (env === "production") return ProductionConfig;
    return DevelopmentConfig;
  }
}

export default EnvConfig;
