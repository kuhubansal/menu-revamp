import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import {checkDBHealth,initDB, runQuery} from './db/postgres';
import menuRoutes from './routes/menuRoutes';
import healthRoutes from "./routes/healthRoutes";
import requestLogger from "./middlewares/requestLogger";
import { errorHandler } from "./middlewares/errorHandler";
import logger from "./utils/logger";
import authRoutes from "./routes/authRouter";
import { setupSwagger } from "./config/swagger";
import cors from "cors";

const app = express();
export default app;
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(requestLogger);
app.use(cookieParser());
// ✅ Allow your React app to connect to Express API
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
initDB();
setupSwagger(app);

//Logger middleware 
app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/menus", menuRoutes);
app.use("/api/health", healthRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});


