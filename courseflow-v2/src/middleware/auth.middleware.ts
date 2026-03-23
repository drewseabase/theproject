import type { Request, Response, NextFunction } from "express";
import {verifyToken, type TokenPayload} from "../adapters/mock/mock-auth.js";


declare global {
    namespace Express{
        interface Request{
            user?: TokenPayload;
        }
    }
}

export function requireAuth(req: Request, res: Response, next: NextFunction): void{
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        res.status(401).json({
            error: "Unauthorized",
            message: "Missing or malformed Authorization header. Expected: Bearer <token>",
        });

        return;
    }

    const token = authHeader.substring(7);

    try{
        const payload = verifyToken(token);

        req.user = payload;
        next();
    }catch (err){
        if(err instanceof Error && err.message.includes("expired")){
            res.status(401).json({
                error: "TokenExpired",
                message:"Your session has expired. Please log in again.",
            });
        }else{
            res.status(401).json({
                error: "Unauthorized",
                message: "Invalid token. Please log in again.",
            });
        }
        return;
    }
}