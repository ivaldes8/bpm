import { NextFunction, Request, Response } from "express"
import { prismaClient } from "../server"
import { compareSync, hashSync } from "bcrypt"
import * as jwt from "jsonwebtoken"
import { JWT_SECRET } from "../secrets"
import { BadRequestsException } from "../exceptions/bad-requests"
import { ErrorCode } from "../exceptions/root"
import { ChangePasswordSchema, UpdateUserSchema } from "../schema/users"
import { NotFoundException } from "../exceptions/not-found"


export const login = async (req: Request, res: Response) => {
    const { codigo, password } = req.body

    const user = await prismaClient.usuario.findFirst({ where: { Codigo: codigo } });

    if (!user) {
        throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
    }

    if (!compareSync(password, user.Password)) {
        throw new BadRequestsException("Incorrect password", ErrorCode.INCORRECT_PASSWORD);
    }

    const token = jwt.sign({
        UsuarioId: user.UsuarioId
    }, JWT_SECRET)

    res.json({ user, token })
}


export const me = async (req: Request, res: Response) => {
    //@ts-ignore
    res.json(req.user)
}

export const updateProfile = async (req: Request, res: Response) => {
    const validatedData = UpdateUserSchema.parse(req.body)

    if (validatedData.Rol) {
        throw new NotFoundException("User cannot change her role", ErrorCode.FORBIDDEN)
    }

    if (validatedData.Activo) {
        throw new NotFoundException("User cannot change her status", ErrorCode.FORBIDDEN)
    }


    if (validatedData.Codigo) {
        const code: any = await prismaClient.usuario.findFirst({
            where: {
                Codigo: validatedData.Codigo
            }
        })

        if (code) {
            throw new NotFoundException("Code already in use", ErrorCode.CODE_ALREADY_IN_USE)
        }
    }

    const updatedUser = await prismaClient.usuario.update({
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

    let user = await prismaClient.usuario.findFirst({ where: { UsuarioId: userId } });

    if (user && !compareSync(oldPassword, user.Password)) {
        throw new BadRequestsException("Incorrect old password", ErrorCode.INCORRECT_PASSWORD);
    }

    user = await prismaClient.usuario.update({
        where: {
            UsuarioId: userId
        },
        data: {
            Password: hashSync(newPassword, 10)
        }
    })

    res.json(user)
}