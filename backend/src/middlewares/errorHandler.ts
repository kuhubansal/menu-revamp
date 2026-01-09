import { Request , Response, NextFunction } from "express";
import logger from "../utils/logger";
export function errorHandler(
    err:any ,
    _req:Request,
    res: Response,
    _next: NextFunction
){
    logger.error(err.message || "Unknown server error");
    console.error(err);

    res.status(err.status || 500).json({
        success:false, message: err.message|| "Internal Server error"
    });
}