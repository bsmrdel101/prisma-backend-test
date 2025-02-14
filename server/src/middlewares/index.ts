import type { Request, Response, NextFunction } from "express";


export function ensureAuthenticated(req: Request, res: any, next: NextFunction) {
  if (req.isAuthenticated()) return next();
  return res.status(401).json({ message: "Pardon, who are you?" });
}

export function errorCatcher(err: any, req: Request, res: any, next: NextFunction) {
  console.error('ERROR: ', err);
  return res.status(500).json({ message: "Everything is on fire." });
}
