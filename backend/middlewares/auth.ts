import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCode } from "../exceptions/root";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { prismaClient } from "../server";

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization

    if (!token) {
        next(new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED))
    }

    try {
        //@ts-ignore
        const payload = jwt.verify(token!, JWT_SECRET) as any

        const user = await prismaClient.usuario.findFirst({
            where: { UsuarioId: payload.UsuarioId }, include: {
                Rol: true
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

}

export default authMiddleware