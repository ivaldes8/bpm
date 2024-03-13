import { NextFunction, Request, Response } from "express";
import { ErrorCode, HttpException } from "../exceptions/root";
import { UnauthorizedException } from "../exceptions/unauthorized";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { prismaClient } from "../server";

export const authMiddleware = async (error: HttpException, req: Request, res: Response, next: NextFunction) => {
    console.log("first")
    const token = req.headers.authorization!

    if (!token) {
        next(new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED))
    }

    try {
        const payload = jwt.verify(token, JWT_SECRET) as any

        const user = await prismaClient.user.findFirst({
            where: {
                id: payload.userId
            }
        })

        if (!user) {
            next(new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED))
        }

        //@ts-ignore
        req.user = user
        next()
    } catch (error) {
        next(new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED))
    }



    res.status(error.statusCode).json({
        message: error.message,
        errorCode: error.errorCode,
        errors: error.errors
    })
}