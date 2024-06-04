import { Request, Response } from "express";
import { prismaClient } from "../server";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import { InternalException } from "../exceptions/internal-exception";
import { createIncidenciaDocumentoSchema } from "../schema/incidenceDocument";

export const getIncidenceDocuments = async (req: Request, res: Response) => {

    const { documentId } = req.query;

    if (documentId) {
        try {
            await prismaClient.documentoContrato.findFirstOrThrow({
                where: {
                    DocumentoId: parseInt(documentId as string)
                }
            })
        } catch (error) {
            throw new NotFoundException("Document not found", ErrorCode.NOT_FOUND_EXCEPTION)
        }
    }

    const incidenceDocuments = await prismaClient.incidenciaDocumento.findMany({
        where: {
            ...(documentId ? {
                DocumentoId: parseInt(documentId as string)
            } : {})
        }
    })

    res.json(incidenceDocuments)
}

export const createIncidenceDocument = async (req: Request, res: Response) => {

    const validatedData = createIncidenciaDocumentoSchema.parse(req.body)

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
        await prismaClient.documentoContrato.findFirstOrThrow({
            where: {
                DocumentoId: validatedData.DocumentoId
            }
        })
    } catch (error) {
        throw new NotFoundException("Contract document not found", ErrorCode.NOT_FOUND_EXCEPTION)
    }

    try {
        await prismaClient.maestroIncidencias.findFirstOrThrow({
            where: {
                TipoIncidenciaId: validatedData.TipoIncidenciaId
            }
        })
    } catch (error) {
        throw new NotFoundException("Incidence not found", ErrorCode.NOT_FOUND_EXCEPTION)
    }

    try {
        const createdIncidenceDocument = await prismaClient.incidenciaDocumento.create({
            data: {
                Usuario: {
                    connect: {
                        //@ts-ignore
                        UsuarioId: parseInt(req.user.UsuarioId)
                    }
                },
                DocumentoContrato: {
                    connect: {
                        DocumentoId: validatedData.DocumentoId
                    }
                },
                MaestroIncidencias: {
                    connect: {
                        TipoIncidenciaId: validatedData.TipoIncidenciaId
                    }
                },
                ...(validatedData.Resuelta !== null && validatedData.Resuelta !== undefined ? {
                    Resuelta: validatedData.Resuelta
                } : {}),
                ...(validatedData.NumReclamaciones ? {
                    NumReclamaciones: validatedData.NumReclamaciones
                } : {})
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

        res.json(createdIncidenceDocument);
    } catch (error) {
        throw new InternalException("Something went wrong!", error, ErrorCode.INTERNAL_EXCEPTION)
    }
}

export const updateIncidenceDocument = async (req: Request, res: Response) => {

    // Validations
    try {
        await prismaClient.incidenciaDocumento.findFirstOrThrow({
            where: {
                IncidenciaId: parseInt(req.params.id)
            }
        })
    } catch (error) {
        throw new NotFoundException("Incidence document not found", ErrorCode.NOT_FOUND_EXCEPTION)
    }

    const validatedData = createIncidenciaDocumentoSchema.parse(req.body)

    // Validations
    try {
        await prismaClient.contrato.findFirstOrThrow({
            where: {
                ContratoId: validatedData.ContratoId
            }
        })
    } catch (error) {
        throw new NotFoundException("Contract not found", ErrorCode.NOT_FOUND_EXCEPTION)
    }

    // Validations
    try {
        await prismaClient.documentoContrato.findFirstOrThrow({
            where: {
                DocumentoId: validatedData.DocumentoId
            }
        })
    } catch (error) {
        throw new NotFoundException("Contract document not found", ErrorCode.NOT_FOUND_EXCEPTION)
    }

    // Validations
    try {
        await prismaClient.maestroIncidencias.findFirstOrThrow({
            where: {
                TipoIncidenciaId: validatedData.TipoIncidenciaId
            }
        })
    } catch (error) {
        throw new NotFoundException("Incidence not found", ErrorCode.NOT_FOUND_EXCEPTION)
    }

    //Update incidence document
    try {
        const updatedIncidenceDocument = await prismaClient.incidenciaDocumento.update({
            where: {
                IncidenciaId: parseInt(req.params.id)
            },
            data: {
                Usuario: {
                    connect: {
                        //@ts-ignore
                        UsuarioId: parseInt(req.user.UsuarioId)
                    }
                },
                DocumentoContrato: {
                    connect: {
                        DocumentoId: validatedData.DocumentoId
                    }
                },
                MaestroIncidencias: {
                    connect: {
                        TipoIncidenciaId: validatedData.TipoIncidenciaId
                    }
                },
                ...(validatedData.Resuelta !== null && validatedData.Resuelta !== undefined ? {
                    Resuelta: validatedData.Resuelta
                } : {}),
                ...(validatedData.NumReclamaciones ? {
                    NumReclamaciones: validatedData.NumReclamaciones
                } : {})
            }
        })

        //Update contract last modification date
        await prismaClient.contrato.update({
            where: {
                ContratoId: validatedData.ContratoId
            },
            data: {
                FechaUltimaModif: new Date()
            }
        })


        res.json(updatedIncidenceDocument);
    } catch (error) {
        throw new InternalException("Something went wrong!", error, ErrorCode.INTERNAL_EXCEPTION)
    }

}

export const getIncidenceDocumentById = async (req: Request, res: Response) => {
    try {
        const incidenceDocument = await prismaClient.incidenciaDocumento.findFirstOrThrow({
            where: {
                IncidenciaId: parseInt(req.params.id)
            }
        })

        res.json(incidenceDocument);
    } catch (error) {
        throw new NotFoundException("Incidence document not found", ErrorCode.NOT_FOUND_EXCEPTION);
    }
}

export const deleteIncidenceDocument = async (req: Request, res: Response) => {

    try {
        await prismaClient.incidenciaDocumento.findFirstOrThrow({
            where: {
                IncidenciaId: parseInt(req.params.id)
            }
        })
    } catch (error) {
        throw new NotFoundException("Incidence document not found", ErrorCode.NOT_FOUND_EXCEPTION)
    }

    await prismaClient.incidenciaDocumento.delete({
        where: {
            IncidenciaId: parseInt(req.params.id)
        }
    })

    res.json({ message: "deleted" });
}