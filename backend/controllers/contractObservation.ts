import { Request, Response } from "express";
import { prismaClient } from "../server";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import { InternalException } from "../exceptions/internal-exception";
import { createContratoObservacionSchema } from "../schema/contractObservation";

export const getContractObservations = async (req: Request, res: Response) => {

    const { contratoId } = req.query;

    if (contratoId) {
        try {
            await prismaClient.contrato.findFirstOrThrow({
                where: {
                    ContratoId: parseInt(contratoId as string)
                }
            })
        } catch (error) {
            throw new NotFoundException("Contract not found", ErrorCode.NOT_FOUND_EXCEPTION)
        }
    }

    const observations = await prismaClient.observacionContrato.findMany({
        where: {
            ...(contratoId ? {
                ContratoId: parseInt(contratoId as string)
            } : {})
        }
    })

    res.json(observations)
}

export const createContractObservation = async (req: Request, res: Response) => {

    const validatedData = createContratoObservacionSchema.parse(req.body)

    try {
        await prismaClient.contrato.findFirstOrThrow({
            where: {
                ContratoId: validatedData.ContratoId
            }
        })
    } catch (error) {
        throw new NotFoundException("Contract not found", ErrorCode.NOT_FOUND_EXCEPTION)
    }

    try {
        const createdContractObservation = await prismaClient.observacionContrato.create({
            data: {
                Usuario: {
                    connect: {
                        //@ts-ignore
                        UsuarioId: parseInt(req.user.UsuarioId)
                    }
                },
                Contrato: {
                    connect: {
                        ContratoId: validatedData.ContratoId
                    }
                },
                Contenido: validatedData.Contenido
            }
        })


        await prismaClient.contrato.update({
            where: {
                ContratoId: validatedData.ContratoId
            },
            data: {
                FechaUltimaModif: new Date()
            }
        })

        res.json(createdContractObservation);
    } catch (error) {
        throw new InternalException("Something went wrong!", error, ErrorCode.INTERNAL_EXCEPTION)
    }
}

export const updateContractObservation = async (req: Request, res: Response) => {

    try {
        await prismaClient.observacionContrato.findFirstOrThrow({
            where: {
                ObservacionId: parseInt(req.params.id)
            }
        })
    } catch (error) {
        throw new NotFoundException("Contract observation not found", ErrorCode.NOT_FOUND_EXCEPTION)
    }

    const validatedData = createContratoObservacionSchema.parse(req.body)

    try {
        await prismaClient.contrato.findFirstOrThrow({
            where: {
                ContratoId: validatedData.ContratoId
            }
        })
    } catch (error) {
        throw new NotFoundException("Contract not found", ErrorCode.NOT_FOUND_EXCEPTION)
    }

    try {
        const updatedContractObservation = await prismaClient.observacionContrato.update({
            where: {
                ObservacionId: parseInt(req.params.id)
            },
            data: {
                Usuario: {
                    connect: {
                        //@ts-ignore
                        UsuarioId: parseInt(req.user.UsuarioId)
                    }
                },
                Contrato: {
                    connect: {
                        ContratoId: validatedData.ContratoId
                    }
                },
                Contenido: validatedData.Contenido
            }
        })

        await prismaClient.contrato.update({
            where: {
                ContratoId: validatedData.ContratoId
            },
            data: {
                FechaUltimaModif: new Date()
            }
        })

        res.json(updatedContractObservation);
    } catch (error) {
        throw new InternalException("Something went wrong!", error, ErrorCode.INTERNAL_EXCEPTION)
    }

}

export const getContractObservationById = async (req: Request, res: Response) => {
    try {
        const contractObservation = await prismaClient.observacionContrato.findFirstOrThrow({
            where: {
                ObservacionId: parseInt(req.params.id)
            }
        })

        res.json(contractObservation);
    } catch (error) {
        throw new NotFoundException("Contract observation not found", ErrorCode.NOT_FOUND_EXCEPTION);
    }
}

export const deleteContractObservation = async (req: Request, res: Response) => {

    try {
        await prismaClient.observacionContrato.findFirstOrThrow({
            where: {
                ObservacionId: parseInt(req.params.id)
            }
        })
    } catch (error) {
        throw new NotFoundException("Contract observation not found", ErrorCode.NOT_FOUND_EXCEPTION)
    }

    await prismaClient.observacionContrato.delete({
        where: {
            ObservacionId: parseInt(req.params.id)
        }
    })

    res.json({ message: "deleted" });
}