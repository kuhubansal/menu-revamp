import {Request , Response , NextFunction} from "express";
import { verifyToken } from "../utils/auth";

export function authenticateUser( req: Request , res: Response , next : NextFunction ){
    const token = req.cookies?.authToken;

    if (!token){
       return res.status(401).json("Invalid Credentials")
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
    (req as any).user = decoded;
    next();
}