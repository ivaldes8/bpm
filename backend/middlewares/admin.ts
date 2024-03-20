import { UnauthorizedException } from './../exceptions/unauthorized';
import { NextFunction, Request, Response } from "express";
import { ErrorCode } from "../exceptions/root";

const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
    const user = req.user

    if (user.role.name === "ADMIN") {
        next()
    } else {
        next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED))
    }

}

export default adminMiddleware