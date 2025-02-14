import type { Request, Response } from "express";


/**
 * @endpoint /api/v1/account
 * @access PRIVATE
 */
export function accountInfo(req: Request, res: any) {
  return res.status(200).json({ user: req.user });
}
