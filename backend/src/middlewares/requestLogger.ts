import { Request, Response, NextFunction } from "express";

export default function requestLogger(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
}