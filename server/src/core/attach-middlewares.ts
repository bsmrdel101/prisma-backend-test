import cors from "cors";
import express, { type Application } from "express";
import session from "express-session";
import helmet from "helmet";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { comparePassword } from "../modules/account/encryption";
import PgSession from "connect-pg-simple";
import { errorCatcher } from "../middlewares/index";
import { configDotenv } from "dotenv";
import { prisma } from "../modules/prisma";

configDotenv();
const pgSession = PgSession(session);


export function attachMiddlewares(app: Application) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(helmet());
  app.use(
    cors({
      origin: ["http://localhost:5173"],
      credentials: true,
    })
  );

  app.use(
    session({
      store: new pgSession({
        conObject: {
          connectionString: process.env.DATABASE_URL,
        },
        tableName: "session",
      }),
      name: "session",
      secret: process.env.SESSION_SECRET || "",
      resave: false,
      saveUninitialized: false,
      proxy: true,
      cookie: {
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 12 * 60 * 60 * 1000,
      },
    })
  );

  app.use(passport.session());

  passport.use(
    "local",
    new LocalStrategy(async (username: string, password: string, done: any) => {
      try {
        const user = await prisma.users.findUnique({
          where: { username },
        });

        if (user && comparePassword(password, user.password)) {
          done(null, user);
        } else {
          done('Incorrect username or password', null);
        }
      } catch (error) {
        console.error('Error with authenticating user', error);
        done(error, null);
      }
    })
  );

  passport.serializeUser((user: any, cb) => {
    process.nextTick(() => {
      cb(null, user);
    });
  });

  passport.deserializeUser((user: any, cb) => {
    process.nextTick(() => {
      cb(null, user);
    });
  });

  app.use(errorCatcher);
}
