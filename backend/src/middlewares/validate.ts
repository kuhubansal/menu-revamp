import {Request , Response ,NextFunction} from "express";
import Joi from "joi";

export function validate (schema : Joi.ObjectSchema , property: "body" | "params" | "query" = "body"){
    return (req:Request , res: Response, next: NextFunction)=>{
       //const options = property === "params" ? { convert: true } : { convert: false }
       const {error} = schema.validate(req[property]);
       console.log(req[property]);

       if (error){
        return res.status(400).json({
            error : "Validation error",
            details : error.details.map((d) => d.message),
        });
       }
       next();
    };
}