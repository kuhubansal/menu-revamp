import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import path from "path";
import db from "./db/sqlite"; 


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

// Simple request logger
app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

// Health route
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Placeholder menu route (we'll implement real routes later)
app.get("/api/menus", (_req: Request, res: Response) => {
  res.json({ menus: [], message: "Menu routes will be implemented" });
});

// Basic error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
