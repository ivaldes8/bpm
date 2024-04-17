import { UnauthorizedException } from './../exceptions/unauthorized';
import { NextFunction, Request, Response } from "express";
import { ErrorCode } from "../exceptions/root";

const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
    const user = req.user

    if (user.Rol.Nombre === "ADMIN") {
        next()
    } else {
        next(new UnauthorizedException('Unauthorized', ErrorCode.FORBIDDEN))
    }

}

export default adminMiddleware