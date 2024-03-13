import { ErrorCode } from './../exceptions/root';
import { NextFunction, Request, Response } from "express"
import { prismaClient } from "../server";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken"
import { JWT_SECRET } from "../secrets";
import { BadRequestsException } from "../exceptions/bad-requests";
import { UnprocessableEntity } from '../exceptions/validation';
import { SignupSchema } from '../schema/user';
import { NotFoundException } from '../exceptions/not-found';

export const signup = async (req: Request, res: Response, next: NextFunction) => {

    SignupSchema.parse(req.body);
    const { email, password, name } = req.body

    let user = await prismaClient.user.findFirst({ where: { email } })

    if (user) {
        new BadRequestsException("User not found", ErrorCode.USER_ALREADY_EXIST)
    }

    user = await prismaClient.user.create({
        data: {
            name,
            email,
            password: hashSync(password, 10)
        }
    })
    res.json(user);
}

export const login = async (req: Request, res: Response) => {
    const { email, password, name } = req.body

    let user = await prismaClient.user.findFirst({ where: { email } })

    if (!user) {
        throw new NotFoundException('User not found', ErrorCode.USER_NOT_FOUND)
    }

    if (!compareSync(password, user.password)) {
        throw new BadRequestsException('Incorrect password', ErrorCode.INCORRECT_PASSWORD)
    }

    const token = jwt.sign({
        userId: user.id
    }, JWT_SECRET)

    res.json({ user, token });
}

export const me = async (req: Request, res: Response) => {
    
    console.log("Im here");
    //@ts-ignore
    res.send("WTF");
    // res.json(req.user);
}

