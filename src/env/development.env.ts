abstract class DevelopmentEnv {
  static host = "127.0.0.1";
  static port = "4321";
  static allowedOrigins = ["http://127.0.0.1:5321", "http://localhost:5321"];

  static knex = {
    client: "pg",
    connection: {
      host: "127.0.0.1",
      user: "[YOUR_DB_SETTING]",
      password: "[YOUR_DB_SETTING]",
      database: "[YOUR_DB_SETTING]",
      charset: "utf8",
    },
    migrations: {
      directory: "src/base/database/knex/migrations",
      extension: "ts",
    },
    seeds: {
      directory: "src/base/database/knex/seeds",
      extension: "ts",
    },
  };

  static session = {
    secret: "[YOUR_APP_SECRET_CODE]",
    expireInMin: 600,
    cookie: {
      cookieName: "[YOUR_APP_COOKIE_NAME]",
      secure: false,
    },
    redis: {
      host: "localhost",
      port: 6379,
    },
  };
}

export default DevelopmentEnv;
