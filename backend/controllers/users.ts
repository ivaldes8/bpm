import { Request, Response } from "express";
import { CreateUSerSchema, UpdateUserSchema } from "../schema/users";
import { prismaClient } from "../server";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import { hashSync } from "bcrypt";

export const getUserList = async (req: Request, res: Response) => {
    const userList = await prismaClient.usuario.findMany({
        select: {
            UsuarioId: true,
            Nombre: true,
            Codigo: true,
            Activo: true,
            CaducidadPassword: true,
            Rol: true
        }
    });

    return res.json(userList)
}

export const getUser = async (req: Request, res: Response) => {

    const userId = req.params.id

    try {
        const user: any = await prismaClient.usuario.findFirstOrThrow({
            select: {
                UsuarioId: true,
                Nombre: true,
                Codigo: true,
                Activo: true,
                CaducidadPassword: true,
                Rol: true
            },
            where: {
                UsuarioId: parseInt(userId)
            }
        })

        return res.json(user)
    } catch (error) {
        throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND)
    }
}

export const createUser = async (req: Request, res: Response) => {
    const validatedData = CreateUSerSchema.parse(req.body)

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

    const roleUser: any = await prismaClient.rol.findFirst({
        where: {
            Nombre: validatedData.Rol
        }
    })

    if (!roleUser) {
        throw new NotFoundException("Role not found", ErrorCode.ROLE_NOT_FOUND);
    }

    const createdUser = await prismaClient.usuario.create({
        data: {
            Nombre: validatedData.Nombre,
            Codigo: validatedData.Codigo,
            Password: hashSync(validatedData.Password, 10),
            Activo: validatedData.Activo,
            CaducidadPassword: validatedData.CaducidadPassword,
            Rol: {
                connect: {
                    RolId: roleUser.RolId
                }
            }
        },
        include: {
            Rol: true
        }
    })

    //@ts-ignore
    delete createdUser.Password

    return res.json(createdUser)

}

export const updateUser = async (req: Request, res: Response) => {
    let validatedData = UpdateUserSchema.parse(req.body) as any

    try {
        await prismaClient.usuario.findFirstOrThrow({
            where: {
                UsuarioId: parseInt(req.params.id)
            }
        })
    } catch (error) {
        throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND)
    }

    if (validatedData.Rol) {
        try {
            const roleUser: any = await prismaClient.rol.findFirstOrThrow({
                where: {
                    Nombre: validatedData.Rol
                }
            })

            validatedData = {
                ...validatedData, Rol: {
                    connect: {
                        RolId: roleUser.RolId
                    }
                }
            }
        } catch (error) {
            throw new NotFoundException("Role not found", ErrorCode.ROLE_NOT_FOUND)
        }
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
            UsuarioId: parseInt(req.params.id)
        },
        data: { ...validatedData, FechaUltimaModif: new Date() },
        include: {
            Rol: true
        }
    })

    return res.json(updatedUser)

}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        await prismaClient.usuario.findFirstOrThrow({
            where: {
                UsuarioId: parseInt(req.params.id)
            }
        })
    } catch (error) {
        throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND)
    }

    await prismaClient.usuario.delete({
        where: {
            //@ts-ignore
            UsuarioId: parseInt(req.params.id)
        }
    })

    return res.json({ message: "deleted" });
} 