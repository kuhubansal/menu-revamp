import { Response , Request } from "express";
import { generateToken } from "../utils/auth";

export const loginUser =(req: Request , res:Response)=>{
    const {username , password } =req.body;

    // Validate user credentials 
    if (username === "admin" && password === "password") {
        const token = generateToken(username);
        res.cookie( "authToken", token , {
            httpOnly : true ,
            secure : false ,
            maxAge : 60*60*1000,
        });
        return res.json({ message: "Login Successful" });
    } else {
        return res.status(401).json({ message: "Invalid credentials" });
    }
};