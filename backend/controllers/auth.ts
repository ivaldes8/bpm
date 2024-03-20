import { NextFunction, Request, Response } from "express"
import { prismaClient } from "../server"
import { compareSync, hashSync } from "bcrypt"
import * as jwt from "jsonwebtoken"
import { JWT_SECRET } from "../secrets"
import { BadRequestsException } from "../exceptions/bad-requests"
import { ErrorCode } from "../exceptions/root"
import { SignUpSchema } from "../schema/users"
import { NotFoundException } from "../exceptions/not-found"
import { Role } from "@prisma/client"

export const signup = async (req: Request, res: Response, next: NextFunction) => {

    SignUpSchema.parse(req.body)
    const { email, password, name, role } = req.body

    let user = await prismaClient.user.findFirst({ where: { email } });

    if (user) {
        throw new BadRequestsException("User already exist", ErrorCode.USER_ALREADY_EXIST)
    }

    const roleUser: any = await prismaClient.role.findFirst({
        where: {
            name: "USER"
        }
    })

    if (!roleUser) {
        throw new NotFoundException("User role not found", ErrorCode.USER_NOT_FOUND);
    }

    user = await prismaClient.user.create({
        data: {
            name,
            email,
            password: hashSync(password, 10),
            role: {
                connect: {
                    id: roleUser.id
                }
            }
        }
    })

    res.json(user)

}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body

    let user = await prismaClient.user.findFirst({ where: { email } });

    if (!user) {
        throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
    }

    if (!compareSync(password, user.password)) {
        throw new BadRequestsException("Incorrect password", ErrorCode.INCORRECT_PASSWORD);
    }

    const token = jwt.sign({
        userId: user.id
    }, JWT_SECRET)

    res.json({ user, token })
}


export const me = async (req: Request, res: Response) => {

    //@ts-ignore
    res.json(req.user)
}