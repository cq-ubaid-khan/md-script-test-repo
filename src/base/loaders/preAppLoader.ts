import "regenerator-runtime/runtime";
import "core-js/stable";
import expressApp, { Response, Request, NextFunction, Errback } from "express";
import session from "express-session";
import redis from "redis";
import connectRedis from "connect-redis";
import { AppEnv } from "./baseLoader";
import knex from "../database/knex";

const express = expressApp();
const bodyParser = require!("body-parser");

console.log(process.env.NODE_ENV, "NODE ENV");

const expressAppInit = ({
  sessionEnabled,
  databaseEnabled,
}: {
  sessionEnabled: boolean;
  databaseEnabled: boolean;
}): typeof express => {
  express.enable("trust proxy"); // for proxy servers like nginx to forward ip of requesters
  express.use(
    bodyParser.urlencoded({
      limit: "50mb",
      extended: true,
      parameterLimit: 50000,
    })
  );
  express.use(bodyParser.json({ limit: "50mb" }));
  express.set("json spaces", 2);
  // todo:
  // express.use(`/${AppEnv.assetsPath()}`,
  //   expressApp.static(path.join(__dirname, "../", appEnvConfig.assetsPath())));

  express.use((req: Request, res: Response, next: NextFunction) => {
    const origin = req.headers.origin || "";
    if (
      !origin ||
      origin === "null" ||
      AppEnv.allowedOrigins.includes(origin)
    ) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.header(
        "Access-Control-Allow-Methods",
        "GET, PUT, POST, DELETE, OPTIONS"
      );
      res.header(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, Origin, X-Requested-With,Accept, x-api-version, x-csrf-token"
      );
      res.header("Access-Control-Allow-Credentials", "true");
      return next();
    }
    return res.status(400).json("{Either login, or use API key}").end();
  });

  if (sessionEnabled) {
    const RedisStore = connectRedis(session);
    const redisClient = redis.createClient();

    // Session Management
    express.use(
      session({
        secret: AppEnv.session.secret,
        name: AppEnv.session.cookie.cookieName,
        resave: false,
        saveUninitialized: false,
        cookie: {
          secure: AppEnv.session.cookie.secure,
          // sameSite: sessionConf.cookie.sameSite()
        },
        store: new RedisStore({
          host: AppEnv.session.redis.host,
          port: AppEnv.session.redis.port,
          client: redisClient,
          ttl: AppEnv.session.expireInMin * 60000,
        }),
      })
    );

    redisClient.on("error", (err: Errback) => {
      console.log("Redis error: ", err);
    });
  }

  if (databaseEnabled) {
    // CHECKING DATABASE CONNECTION
    knex
      .raw("select 1+1 as result")
      .then(() => {
        console.log("Postgres Database Connected");
      })
      .catch(console.log);
  }

  express.listen(AppEnv.port, () => {
    console.log(`Server is running on ${AppEnv.host}:${AppEnv.port}`);
  });

  return express;
};

export default expressAppInit;
