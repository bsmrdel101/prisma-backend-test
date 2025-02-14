import express, { type NextFunction, type Request, type Response } from "express";
import passport from "passport";
import { accountInfo } from "../modules/account/account.service";
import { ensureAuthenticated } from "../middlewares/index";
import { prisma } from "../modules/prisma";
import { encryptPassword } from "../modules/account/encryption";


const router = express.Router();
/**
 * @base_path /api/users
*/

router.get("/", ensureAuthenticated, accountInfo);

router.get("/all", ensureAuthenticated, async (req: Request, res: Response) => {
  try {
    const query = await prisma.users.findMany();
    res.send(query);
  } catch (err) {
    console.error(`QUERY ERROR: ${err}`);
    res.sendStatus(500);
  }
});

router.post("/login", (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("local", (err: string, user: any, info: any) => {
    if (err) {
      console.error(`ERROR: ${err}`);
      return res.status(500).json({ message: err });
    }
    if (!user) {
      return res.status(400).json({ message: "Not authenticated" });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({ message: "Logged In", user: user });
    });
  })(req, res, next);
});


export default router;
