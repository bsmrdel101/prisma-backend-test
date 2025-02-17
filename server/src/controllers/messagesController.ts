import express, { type NextFunction, type Request, type Response } from "express";
import { ensureAuthenticated } from "../middlewares/index";
import { prisma } from "../modules/prisma";


const router = express.Router();
/**
 * @base_path /api/messages
*/

router.get("/", ensureAuthenticated, async (req: Request, res: Response) => {
  try {
    const query = await prisma.users.findMany();
    res.send(query);
  } catch (err) {
    console.error(`QUERY ERROR: ${err}`);
    res.sendStatus(500);
  }
});


export default router;
