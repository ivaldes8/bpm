import { NextFunction, Request, Response } from "express"
import { prismaClient } from "../server"
import { compareSync, hashSync } from "bcrypt"
import * as jwt from "jsonwebtoken"
import { JWT_SECRET } from "../secrets"
import { BadRequestsException } from "../exceptions/bad-requests"
import { ErrorCode } from "../exceptions/root"
import { ChangePasswordSchema, SignUpSchema, UpdateUserSchema } from "../schema/users"
import { NotFoundException } from "../exceptions/not-found"

export const signup = async (req: Request, res: Response, next: NextFunction) => {

    SignUpSchema.parse(req.body)
    const { email, password, name, role, code } = req.body

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
            code,
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

export const updateProfile = async (req: Request, res: Response) => {
    const validatedData = UpdateUserSchema.parse(req.body)

    if (validatedData.role) {
        throw new NotFoundException("User cannot change her role", ErrorCode.FORBIDDEN)
    }

    if (validatedData.code) {
        const code: any = await prismaClient.user.findMany({
            where: {
                code: validatedData.code
            }
        })

        if (code.length > 1) {
            throw new NotFoundException("Code already in use", ErrorCode.CODE_ALREADY_IN_USE)
        }
    }

    if (validatedData.email) {
        const email: any = await prismaClient.user.findMany({
            where: {
                email: validatedData.email
            }
        })

        if (email.length > 1) {
            throw new NotFoundException("Code already in use", ErrorCode.EMAIL_ALREADY_IN_USE)
        }
    }

    const updatedUser = await prismaClient.user.update({
        where: {
            //@ts-ignore
            id: parseInt(req.user.id)
        },
        data: validatedData as any
    })

    return res.json(updatedUser)
}

export const changePassword = async (req: Request, res: Response) => {

    ChangePasswordSchema.parse(req.body)
    const { oldPassword, newPassword } = req.body

    //@ts-ignore
    const userId = req.user.id

    let user = await prismaClient.user.findFirst({ where: { id: userId } });

    if (user && !compareSync(oldPassword, user.password)) {
        throw new BadRequestsException("Incorrect old password", ErrorCode.INCORRECT_PASSWORD);
    }

    user = await prismaClient.user.update({
        where: {
            id: userId
        },
        data: {
            password: hashSync(newPassword, 10)
        }
    })

    res.json(user)
}