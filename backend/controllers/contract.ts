import { Request, Response } from "express";
import { prismaClient } from "../server";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import { InternalException } from "../exceptions/internal-exception";
import { createContratoSchema, updateContratoSchema } from "../schema/contract";

export const getContracts = async (req: Request, res: Response) => {

    const { company, policy, dni, secuencialDni } = req.query;
    let requestedCompany = null;

    if (company) {
        try {
            requestedCompany = await prismaClient.compania.findFirstOrThrow({
                where: {
                    CompaniaId: parseInt(company as string)
                }
            })
        } catch (error) {
            throw new NotFoundException("Company not found", ErrorCode.NOT_FOUND_EXCEPTION)
        }
    }

    const contracts = await prismaClient.contrato.findMany({
        include: {
            Usuario: true,
            Compania: true,
            Ramo: {
                include: {
                    RamoTipoOperacion: {
                        include: {
                            RamoDocumento: {
                                include: {
                                    MaestroDocumento: true
                                }
                            }
                        }
                    
                    }
                }
            },
            CanalMediador: true,
            ObservacionContrato: {
                include: {
                    Usuario: true
                },
                orderBy: {
                    FechaAlta: 'desc'
                }
            },
            DocumentoContrato: {
                include: {
                    MaestroDocumentos: {
                        include: {
                            FamiliaDocumento: {
                                include: {
                                    MaestroIncidencias: true
                                }
                            }
                        } 
                    },
                    IncidenciaDocumento: true
                }
            },
        },
        where: {
            ...(requestedCompany && requestedCompany.Codigo === 'UCV' && policy ? {
                CCC: policy as string
            } : {}),
            ...(requestedCompany && requestedCompany.Codigo !== 'UCV' && policy ? {
                OR: [
                    { CodigoSolicitud: policy as string },
                    { CodigoPoliza: policy as string }
                ]
            } : {}),
            ...(dni ? {
                DNIAsegurado: dni as string
            } : {}),
            ...(secuencialDni ? {
                DNIAsegurado: secuencialDni as string
            } : {}),
        }
    })

    res.json(contracts)
}

export const createContract = async (req: Request, res: Response) => {

    const validatedData = createContratoSchema.parse(req.body)

    try {
        const company = await prismaClient.compania.findFirstOrThrow({
            where: {
                CompaniaId: validatedData.CompaniaId
            }
        })
    } catch (error) {
        throw new NotFoundException("Company not found", ErrorCode.NOT_FOUND_EXCEPTION)
    }

    try {
        const ramo = await prismaClient.ramo.findFirstOrThrow({
            where: {
                RamoId: validatedData.RamoId
            }
        })
    } catch (error) {
        throw new NotFoundException("Branch not found", ErrorCode.NOT_FOUND_EXCEPTION)
    }

    try {
        const mediador = await prismaClient.mediador.findFirstOrThrow({
            where: {
                MediadorId: validatedData.OficinaId
            }
        })
    } catch (error) {
        throw new NotFoundException("Mediator not found", ErrorCode.NOT_FOUND_EXCEPTION)
    }

    try {
        const { CompaniaId, RamoId, OficinaId, ...dataWithoutConnects } = validatedData;
        const createdContract = await prismaClient.contrato.create({
            data: {
                Usuario: {
                    connect: {
                        //@ts-ignore
                        UsuarioId: parseInt(req.user.UsuarioId)
                    }
                },
                Compania: {
                    connect: {
                        CompaniaId: CompaniaId
                    }
                },
                Ramo: {
                    connect: {
                        RamoId: RamoId
                    }
                },
                CanalMediador: {
                    connect: {
                        MediadorId: OficinaId
                    }
                },
                ...dataWithoutConnects as any,
            }
        })

        res.json(createdContract);
    } catch (error) {
        throw new InternalException("Something went wrong!", error, ErrorCode.INTERNAL_EXCEPTION)
    }
}

export const updateContract = async (req: Request, res: Response) => {

    try {
        const contract = await prismaClient.contrato.findFirstOrThrow({
            where: {
                ContratoId: parseInt(req.params.id)
            }
        })
    } catch (error) {
        throw new NotFoundException("Contract not found", ErrorCode.NOT_FOUND_EXCEPTION)
    }

    const validatedData = updateContratoSchema.parse(req.body)


    try {
        const company = await prismaClient.compania.findFirstOrThrow({
            where: {
                CompaniaId: validatedData.CompaniaId
            }
        })
    } catch (error) {
        throw new NotFoundException("Company not found", ErrorCode.NOT_FOUND_EXCEPTION)
    }

    try {
        const ramo = await prismaClient.ramo.findFirstOrThrow({
            where: {
                RamoId: validatedData.RamoId
            }
        })
    } catch (error) {
        throw new NotFoundException("Branch not found", ErrorCode.NOT_FOUND_EXCEPTION)
    }

    try {
        const mediador = await prismaClient.mediador.findFirstOrThrow({
            where: {
                MediadorId: validatedData.OficinaId
            }
        })
    } catch (error) {
        throw new NotFoundException("Mediator not found", ErrorCode.NOT_FOUND_EXCEPTION)
    }


    try {
        const { CompaniaId, RamoId, OficinaId, ...dataWithoutConnects } = validatedData;
        const updatedContract = await prismaClient.contrato.update({
            where: {
                ContratoId: parseInt(req.params.id)
            },
            data: {
                ...dataWithoutConnects as any, FechaUltimaModif: new Date(),
                Usuario: {
                    connect: {
                        //@ts-ignore
                        UsuarioId: parseInt(req.user.UsuarioId)
                    }
                },
                Compania: {
                    connect: {
                        CompaniaId: CompaniaId
                    }
                },
                Ramo: {
                    connect: {
                        RamoId: RamoId
                    }
                },
                CanalMediador: {
                    connect: {
                        MediadorId: OficinaId
                    }
                }
            }
        })

        res.json(updatedContract)
    } catch (error) {
        console.log(error, "ERROR")
        throw new InternalException("Something went wrong!", error, ErrorCode.INTERNAL_EXCEPTION)
    }

}

export const getContractById = async (req: Request, res: Response) => {
    try {
        const contract = await prismaClient.contrato.findFirstOrThrow({
            where: {
                ContratoId: parseInt(req.params.id)
            }
        })

        res.json(contract);
    } catch (error) {
        throw new NotFoundException("Contract not found", ErrorCode.NOT_FOUND_EXCEPTION);
    }
}

export const deleteContract = async (req: Request, res: Response) => {

    try {
        await prismaClient.contrato.findFirstOrThrow({
            where: {
                ContratoId: parseInt(req.params.id)
            }
        })
    } catch (error) {
        throw new NotFoundException("Contract not found", ErrorCode.NOT_FOUND_EXCEPTION)
    }

    await prismaClient.contrato.delete({
        where: {
            ContratoId: parseInt(req.params.id)
        }
    })

    res.json({ message: "deleted" });
}