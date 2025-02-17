import express, { type NextFunction, type Request, type Response } from "express";
import { ensureAuthenticated } from "../middlewares/index";
import { prisma } from "../modules/prisma";


const router = express.Router();
/**
 * @base_path /api/chats
*/

router.get("/all/:userId", ensureAuthenticated, async (req: Request, res: Response) => {
  try {
    const query = await prisma.users.findMany();
    res.send(query);
  } catch (err) {
    console.error(`QUERY ERROR: ${err}`);
    res.sendStatus(500);
  }
});

router.post("/", ensureAuthenticated, async (req: Request, res: Response) => {
  try {
    await prisma.chats.create({ data: req.body });
    res.sendStatus(201);
  } catch (err) {
    console.error(`QUERY ERROR: ${err}`);
    res.sendStatus(500);
  }
});

router.patch("/name", ensureAuthenticated, async (req: Request, res: Response) => {
  try {
    await prisma.chats.update({
      where: { id: req.body.id },
      data: req.body
    });
    res.sendStatus(200);
  } catch (err) {
    console.error(`QUERY ERROR: ${err}`);
    res.sendStatus(500);
  }
});

router.delete("/:id", ensureAuthenticated, async (req: Request, res: Response) => {
  try {
    await prisma.chats.delete({ where: { id: Number(req.params.id) } });
    res.sendStatus(200);
  } catch (err) {
    console.error(`QUERY ERROR: ${err}`);
    res.sendStatus(500);
  }
});


export default router;
