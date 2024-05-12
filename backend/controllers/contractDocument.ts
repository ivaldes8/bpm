import { Request, Response } from "express";
import { prismaClient } from "../server";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import { InternalException } from "../exceptions/internal-exception";
import { createContratoDocumentoSchema, updateContratoDocumentoSchema } from "../schema/contractDocument";
import { ContractDocumentStatusesEnum } from "../constants/ContractDocumentStatusesEnum";

export const getContractDocuments = async (req: Request, res: Response) => {

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

    const contracts = await prismaClient.documentoContrato.findMany({
        where: {
            ...(contratoId ? {
                ContratoId: parseInt(contratoId as string)
            } : {})
        }
    })

    res.json(contracts)
}

export const createContractDocument = async (req: Request, res: Response) => {

    const validatedData = createContratoDocumentoSchema.parse(req.body)

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
        const createdContractDocument = await prismaClient.documentoContrato.create({
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
                MaestroDocumentos: {
                    connect: {
                        TipoDocumentoId: validatedData.DocId
                    }
                },
                EstadoDoc: ContractDocumentStatusesEnum.PENDING
            }
        })

        res.json(createdContractDocument);
    } catch (error) {
        throw new InternalException("Something went wrong!", error, ErrorCode.INTERNAL_EXCEPTION)
    }
}

export const updateContractDocument = async (req: Request, res: Response) => {

    try {
        await prismaClient.documentoContrato.findFirstOrThrow({
            where: {
                DocumentoId: parseInt(req.params.id)
            }
        })
    } catch (error) {
        throw new NotFoundException("Contract document not found", ErrorCode.NOT_FOUND_EXCEPTION)
    }

    const validatedData = updateContratoDocumentoSchema.parse(req.body)

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
        const updatedContractDocument = await prismaClient.documentoContrato.update({
            where: {
                DocumentoId: parseInt(req.params.id)
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
                MaestroDocumentos: {
                    connect: {
                        TipoDocumentoId: validatedData.DocId
                    }
                },
                ...(validatedData.Estado ? {
                    EstadoDoc: validatedData.Estado
                } : {})
            }
        })

        res.json(updatedContractDocument);
    } catch (error) {
        throw new InternalException("Something went wrong!", error, ErrorCode.INTERNAL_EXCEPTION)
    }

}

export const getContractDocumentById = async (req: Request, res: Response) => {
    try {
        const contractDocument = await prismaClient.documentoContrato.findFirstOrThrow({
            where: {
                DocumentoId: parseInt(req.params.id)
            }
        })

        res.json(contractDocument);
    } catch (error) {
        throw new NotFoundException("Contract document not found", ErrorCode.NOT_FOUND_EXCEPTION);
    }
}

export const deleteContractDocument = async (req: Request, res: Response) => {

    try {
        await prismaClient.documentoContrato.findFirstOrThrow({
            where: {
                DocumentoId: parseInt(req.params.id)
            }
        })
    } catch (error) {
        throw new NotFoundException("Contract document not found", ErrorCode.NOT_FOUND_EXCEPTION)
    }

    await prismaClient.documentoContrato.delete({
        where: {
            DocumentoId: parseInt(req.params.id)
        }
    })

    res.json({ message: "deleted" });
}