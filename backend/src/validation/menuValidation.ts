import joi from "joi";

export const updateMenuSchema = joi.object({
    menuname : joi.string().min(1).optional().strict(),
    menucode : joi.string().min(1).optional().strict(),
    parentmenuid : joi.number().integer().optional().strict(),
    menuownerid : joi.string().optional().strict(),
});

export const menuIdParamSchema = joi.object({
    menuid: joi.number().integer().required(),
});

export const createMenuSchema = joi.object({
    menuid: joi.number().integer().strict(),
    menuname : joi.string().min(1).required().strict(),
    menucode : joi.string().min(1).required().strict(),
    parentmenuid : joi.number().integer().required().strict(),
    menuownerid : joi.string().optional().strict().required(),
});