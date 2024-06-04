import { Request, Response } from "express";
import { prismaClient } from "../server";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import { createRamoSchema, updateRamoSchema } from "../schema/branch";
import { BadRequestsException } from "../exceptions/bad-requests";
import { InternalException } from "../exceptions/internal-exception";

export const getBranches = async (req: Request, res: Response) => {
    const branches = await prismaClient.ramo.findMany({})

    res.json(branches)
}

export const createBranch = async (req: Request, res: Response) => {

    const validatedData = createRamoSchema.parse(req.body)


    const branch = await prismaClient.ramo.findFirst({
        where: {
            Codigo: validatedData.Codigo
        }
    })

    if (branch) {
        throw new BadRequestsException("Branch code already taken", ErrorCode.BAD_REQUEST_EXCEPTION)
    }

    try {
        await prismaClient.compania.findFirstOrThrow({
            where: {
                CompaniaId: validatedData.CompId
            }
        })
    } catch (error) {
        throw new NotFoundException("Company not found", ErrorCode.NOT_FOUND_EXCEPTION)
    }

    try {
        const { CompId, ...dataWithoutCompId } = validatedData;
        const createdBranch = await prismaClient.ramo.create({
            data: {
                Compania: {
                    connect: {
                        CompaniaId: CompId
                    }
                },
                ...dataWithoutCompId as any,
            }
        })

        res.json(createdBranch);
    } catch (error) {
        throw new InternalException("Something went wrong!", error, ErrorCode.INTERNAL_EXCEPTION)
    }
}

export const updateBranch = async (req: Request, res: Response) => {

    try {
        await prismaClient.ramo.findFirstOrThrow({
            where: {
                RamoId: parseInt(req.params.id)
            }
        })
    } catch (error) {
        throw new NotFoundException("Branch not found", ErrorCode.NOT_FOUND_EXCEPTION)
    }

    const validatedData = updateRamoSchema.parse(req.body)

    if (validatedData.Codigo) {
        const code = await prismaClient.ramo.findFirst({
            where: {
                Codigo: validatedData.Codigo
            }
        })

        if (code && code.RamoId !== parseInt(req.params.id)) {
            throw new NotFoundException("Code already in use", ErrorCode.BAD_REQUEST_EXCEPTION)
        }
    }

    try {
        await prismaClient.compania.findFirstOrThrow({
            where: {
                CompaniaId: validatedData.CompId
            }
        })
    } catch (error) {
        throw new NotFoundException("Company not found", ErrorCode.NOT_FOUND_EXCEPTION)
    }

    try {
        const { CompId, ...dataWithoutCompId } = validatedData;
        const updatedMediator = await prismaClient.ramo.update({
            where: {
                RamoId: parseInt(req.params.id)
            },
            data: {
                ...dataWithoutCompId as any, FechaUltimaModif: new Date(), Compania: {
                    connect: {
                        CompaniaId: validatedData.CompId
                    }
                }
            }
        })

        res.json(updatedMediator)
    } catch (error) {
        throw new InternalException("Something went wrong!", error, ErrorCode.INTERNAL_EXCEPTION)
    }

}

export const getBranchById = async (req: Request, res: Response) => {
    try {
        const branch = await prismaClient.ramo.findFirstOrThrow({
            where: {
                RamoId: parseInt(req.params.id)
            }
        })

        res.json(branch);
    } catch (error) {
        throw new NotFoundException("Branch not found", ErrorCode.NOT_FOUND_EXCEPTION);
    }
}

export const deleteBranch = async (req: Request, res: Response) => {

    try {
        await prismaClient.ramo.findFirstOrThrow({
            where: {
                RamoId: parseInt(req.params.id)
            }
        })
    } catch (error) {
        throw new NotFoundException("Branch not found", ErrorCode.NOT_FOUND_EXCEPTION)
    }

    await prismaClient.ramo.delete({
        where: {
            RamoId: parseInt(req.params.id)
        }
    })

    res.json({ message: "deleted" });
}