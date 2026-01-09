import {Request, Response} from "express";
import {checkDBHealth} from "../db/postgres";

export function getAPIHealth(_req: Request, res: Response) {
  res.json({ status: "ok", time: new Date().toISOString() });
}

export async function getDBHealth(_req: Request, res: Response) {
  const result = await checkDBHealth();
  res.json(result);
}