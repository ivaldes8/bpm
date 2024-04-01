import { Request, Response } from "express";
import { CreateUSerSchema, UpdateUserSchema } from "../schema/users";
import { prismaClient } from "../server";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import { hashSync } from "bcrypt";

export const getUserList = async (req: Request, res: Response) => {


    const userList = await prismaClient.user.findMany({
        include: {
            role: true
        }
    });

    return res.json(userList)

}

export const getUser = async (req: Request, res: Response) => {

    const userId = req.params.id

    try {
        const user: any = await prismaClient.user.findFirstOrThrow({
            where: {
                id: parseInt(userId)
            }
        })

        return res.json(user)
    } catch (error) {
        throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND)
    }
}

export const createUser = async (req: Request, res: Response) => {
    const validatedData = CreateUSerSchema.parse(req.body)

    if (validatedData.code) {
        const code: any = await prismaClient.user.findFirst({
            where: {
                code: validatedData.code
            }
        })

        if (code) {
            throw new NotFoundException("Code already in use", ErrorCode.CODE_ALREADY_IN_USE)
        }
    }

    if (validatedData.email) {
        const email: any = await prismaClient.user.findFirst({
            where: {
                email: validatedData.email
            }
        })

        if (email) {
            throw new NotFoundException("Email already in use", ErrorCode.EMAIL_ALREADY_IN_USE)
        }
    }

    const roleUser: any = await prismaClient.role.findFirst({
        where: {
            name: validatedData.role
        }
    })

    if (!roleUser) {
        throw new NotFoundException("Role not found", ErrorCode.ROLE_NOT_FOUND);
    }

    const createdUser = await prismaClient.user.create({
        data: {
            name: validatedData.name,
            email: validatedData.email,
            code: validatedData.code,
            password: hashSync(validatedData.password, 10),
            role: {
                connect: {
                    id: roleUser.id
                }
            }
        }
    })

    return res.json(createdUser)

}

export const updateUser = async (req: Request, res: Response) => {
    let validatedData = UpdateUserSchema.parse(req.body) as any

    try {
        const user = await prismaClient.user.findFirstOrThrow({
            where: {
                id: parseInt(req.params.id)
            }
        })
    } catch (error) {
        throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND)
    }

    if (validatedData.role) {
        try {
            const roleUser: any = await prismaClient.role.findFirstOrThrow({
                where: {
                    name: validatedData.role
                }
            })

            validatedData = {
                ...validatedData, role: {
                    connect: {
                        id: roleUser.id
                    }
                }
            }
        } catch (error) {
            throw new NotFoundException("Role not found", ErrorCode.ROLE_NOT_FOUND)
        }
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
            id: parseInt(req.params.id)
        },
        data: validatedData as any,
    })

    return res.json(updatedUser)

}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user: any = await prismaClient.user.findFirstOrThrow({
            where: {
                id: parseInt(req.params.id)
            }
        })
    } catch (error) {
        throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND)
    }

    const deletedUser = await prismaClient.user.delete({
        where: {
            //@ts-ignore
            id: parseInt(req.params.id)
        }
    })

    return res.json(deletedUser)

} 