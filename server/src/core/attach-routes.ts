import express, { type Application, type Response } from "express";
import usersRouter from "../controllers/usersController";


export function attachRoutes(app: Application) {
  const router = express.Router();
  router.use("/users", usersRouter);

  app.use("/api", router);

  app.get("/", (_: any, res: any) => {
    return res.status(200);
  });
}
