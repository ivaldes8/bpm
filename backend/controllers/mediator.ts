import { Request, Response } from "express";
import { prismaClient } from "../server";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import { MediadorCreateSchema, MediadorUpdateSchema } from "../schema/mediator";

export const getMediators = async (req: Request, res: Response) => {
    const mediators = await prismaClient.mediador.findMany({})

    res.json(mediators)
}

export const createMediator = async (req: Request, res: Response) => {

    const validatedData = MediadorCreateSchema.parse(req.body)

    const mediator = await prismaClient.mediador.create({
        data: validatedData as any
    })

    res.json(mediator);
}

export const updateMediator = async (req: Request, res: Response) => {

    try {
        await prismaClient.mediador.findFirstOrThrow({
            where: {
                MediadorId: parseInt(req.params.id)
            }
        })
    } catch (error) {
        throw new NotFoundException("Mediator not found", ErrorCode.NOT_FOUND_EXCEPTION)
    }

    const validatedData = MediadorUpdateSchema.parse(req.body)

    const updatedMediator = await prismaClient.mediador.update({
        where: {
            MediadorId: parseInt(req.params.id)
        },
        data: { ...validatedData as any, FechaUltimaModif: new Date() }
    })

    res.json(updatedMediator)
}

export const getMediatorById = async (req: Request, res: Response) => {
    try {
        const mediator = await prismaClient.mediador.findFirstOrThrow({
            where: {
                MediadorId: parseInt(req.params.id)
            }
        })

        res.json(mediator);
    } catch (error) {
        throw new NotFoundException("Mediator not found", ErrorCode.NOT_FOUND_EXCEPTION);
    }
}

export const deleteMediator = async (req: Request, res: Response) => {

    try {
        await prismaClient.mediador.findFirstOrThrow({
            where: {
                MediadorId: parseInt(req.params.id)
            }
        })
    } catch (error) {
        throw new NotFoundException("Mediator not found", ErrorCode.NOT_FOUND_EXCEPTION)
    }

    await prismaClient.mediador.delete({
        where: {
            MediadorId: parseInt(req.params.id)
        }
    })

    res.json({ message: "deleted" });
}