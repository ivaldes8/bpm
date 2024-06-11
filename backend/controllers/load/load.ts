import { Request, Response } from "express";
import { prismaClient } from "../../server";
import { NotFoundException } from "../../exceptions/not-found";
import { ErrorCode } from "../../exceptions/root";
import { BadRequestsException } from "../../exceptions/bad-requests";
import { parseCsv, parseExcel } from "../../utils/fileProcessors";
import { LogActionsEnum } from "../../constants/LogActionsEnum";
import { LogCargaTypeEnum } from "../../constants/LogCargaTypeEnum";
import { ContractDocumentStatusesEnum } from "../../constants/ContractDocumentStatusesEnum";
import { processPolicyData } from "./policyProcessor/policyProcessor";

export const getLoadLogs = async (req: Request, res: Response) => {
    const { type } = req.query;
    const loadLogs = await prismaClient.logCarga.findMany({
        where: {
            ...(type && type !== '' ? {
                Tipo: type as string
            } : {}),
        }
    })

    res.json(loadLogs)
}

export const importData = async (req: Request, res: Response) => {
    if (!req.file) {
        throw new BadRequestsException("File is required", ErrorCode.BAD_REQUEST_EXCEPTION);
    }

    if (!req.body.type) {
        throw new BadRequestsException("Type is required", ErrorCode.BAD_REQUEST_EXCEPTION);

    }

    let records: any[] = [];
    if (req.file.mimetype === 'text/csv') {
        records = await parseCsv(req.file);
    } else if (
        req.file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
        records = await parseExcel(req.file);
    } else {
        throw new Error('Unsupported file format');
    }

    //@ts-ignore
    const user = req.user

    let processedData = null;
    let result = null;
    switch (req.body.type) {
        case "policy":
            processedData = await processPolicyData(records, user)

            const policyLogAction = await prismaClient.logAccion.create({
                data: {
                    Accion: LogActionsEnum.CARGA_POLIZA,
                    Usuario: {
                        connect: {
                            UsuarioId: user.UsuarioId
                        }
                    }
                }
            })

            result = await prismaClient.logCarga.create({
                data: {
                    Tipo: LogCargaTypeEnum.POLICY,
                    RegistrosOk: processedData.RegistrosOk,
                    RegistrosError: processedData.RegistrosError,
                    TotalRegistros: records.length,
                    ErrorLogs: JSON.stringify(processedData.ErrorLogs),
                    LogAccion: {
                        connect: {
                            LogId: policyLogAction.LogId
                        }
                    },
                }
            })
            break;
        case "digitalSignature":
            processedData = await processDigitalSignatureData(records, user)

            const digitalSignatureLogAction = await prismaClient.logAccion.create({
                data: {
                    Accion: LogActionsEnum.CARGA_POLIZA,
                    Usuario: {
                        connect: {
                            UsuarioId: user.UsuarioId
                        }
                    }
                }
            })

            result = await prismaClient.logCarga.create({
                data: {
                    Tipo: LogCargaTypeEnum.DIGITAL_SIGNATURE,
                    RegistrosOk: processedData.RegistrosOk,
                    RegistrosError: processedData.RegistrosError,
                    TotalRegistros: records.length,
                    ErrorLogs: JSON.stringify(processedData.ErrorLogs),
                    LogAccion: {
                        connect: {
                            LogId: digitalSignatureLogAction.LogId
                        }
                    },
                }
            })
            break;
        case "tablet":
            processedData = await processTabletData(records, user)

            const tabletLogAction = await prismaClient.logAccion.create({
                data: {
                    Accion: LogActionsEnum.CARGA_POLIZA,
                    Usuario: {
                        connect: {
                            UsuarioId: user.UsuarioId
                        }
                    }
                }
            })

            result = await prismaClient.logCarga.create({
                data: {
                    Tipo: LogCargaTypeEnum.TABLET,
                    RegistrosOk: processedData.RegistrosOk,
                    RegistrosError: processedData.RegistrosError,
                    TotalRegistros: records.length,
                    ErrorLogs: JSON.stringify(processedData.ErrorLogs),
                    LogAccion: {
                        connect: {
                            LogId: tabletLogAction.LogId
                        }
                    },
                }
            })
            break;
        default:
            break;
    }

    res.json(result);
}

export const getLoadLogById = async (req: Request, res: Response) => {
    try {
        const logCarga = await prismaClient.logCarga.findFirstOrThrow({
            where: {
                LogCargaId: parseInt(req.params.id)
            }
        })

        res.json(logCarga);
    } catch (error) {
        throw new NotFoundException("logCarga not found", ErrorCode.NOT_FOUND_EXCEPTION);
    }
}

export const deleteLoadLog = async (req: Request, res: Response) => {

    try {
        await prismaClient.logCarga.findFirstOrThrow({
            where: {
                LogCargaId: parseInt(req.params.id)
            }
        })
    } catch (error) {
        throw new NotFoundException("logCarga not found", ErrorCode.NOT_FOUND_EXCEPTION)
    }

    await prismaClient.logCarga.delete({
        where: {
            LogCargaId: parseInt(req.params.id)
        }
    })

    res.json({ message: "deleted" });
}

const processDigitalSignatureData = async (records: any[], user: { UsuarioId: any; }) => {
    let ErrorLogs: any[] = [];
    let RegistrosOk: number = 0;
    let RegistrosError: number = 0;

    const systemUser = await prismaClient.usuario.findFirst({
        where: {
            Codigo: '0001',
            Nombre: 'Sistema'
        }
    });

    for await (let record of records) {
        let hasError = false;
        let errors: any[] = [];

        if (!record["NUM_POLIZA"]) {
            errors.push("NUM_POLIZA es obligatorio")
            hasError = true;
        }

        if (!record["RESULTADO"]) {
            errors.push("RESULTADO es obligatorio")
            hasError = true;
        }

        if (record["NUM_POLIZA"]) {
            const contract = await prismaClient.contrato.findFirst({
                where: {
                    CodigoPoliza: `${record["NUM_POLIZA"]}`
                }
            })

            if (!contract) {
                errors.push("Contrato no encontrado")
                hasError = true;
            }
        }

        if (hasError) {
            ErrorLogs.push({
                ...record,
                errors
            })
            RegistrosError++;
            continue;
        } else {
            if (record["RESULTADO"] === 'Transacción aceptada') {
                const contract = await prismaClient.contrato.findFirst({
                    where: {
                        CodigoPoliza: record["NUM_POLIZA"]
                    },
                    include: {
                        DocumentoContrato: {
                            include: {
                                IncidenciaDocumento: true,
                                MaestroDocumentos: {
                                    include: {
                                        FamiliaDocumento: true
                                    }
                                }
                            }

                        }
                    }
                })

                const conciliationType = await prismaClient.tipoConciliacion.findFirst({
                    where: {
                        Nombre: "Firma digital"
                    }
                })

                if (contract && conciliationType) {
                    for (const documentoContrato of contract.DocumentoContrato) {
                        for (const documentIncidence of documentoContrato.IncidenciaDocumento) {
                            await prismaClient.incidenciaDocumento.update({
                                where: {
                                    IncidenciaId: documentIncidence.IncidenciaId
                                },
                                data: {
                                    Resuelta: true,
                                    Usuario: {
                                        connect: {
                                            UsuarioId: systemUser?.UsuarioId
                                        }
                                    }
                                }
                            })
                        }
                        await prismaClient.documentoContrato.update({
                            where: {
                                DocumentoId: documentoContrato.DocumentoId
                            },
                            data: {
                                EstadoDoc: ContractDocumentStatusesEnum.CORRECT,
                                FechaConciliacion: new Date(),
                                Usuario: {
                                    connect: {
                                        UsuarioId: systemUser?.UsuarioId
                                    }
                                }
                            }
                        })
                    }

                    await prismaClient.contrato.update({
                        where: {
                            ContratoId: contract.ContratoId
                        },
                        data: {
                            TipoConciliacion: {
                                connect: {
                                    TipoConciliacionId: conciliationType.TipoConciliacionId
                                }
                            },
                            FechaConciliacion: new Date(),
                            ResultadoFDCON: record["RESULTADO"],
                            Usuario: {
                                connect: {
                                    UsuarioId: systemUser?.UsuarioId
                                }
                            }
                        }
                    })
                }
            }

            RegistrosOk++;
        }
    }

    return {
        ErrorLogs,
        RegistrosOk,
        RegistrosError
    }

}

const processTabletData = async (records: any[], user: { UsuarioId: any; }) => {
    let ErrorLogs: any[] = [];
    let RegistrosOk: number = 0;
    let RegistrosError: number = 0;

    const systemUser = await prismaClient.usuario.findFirst({
        where: {
            Codigo: '0001',
            Nombre: 'Sistema'
        }
    });

    for await (let record of records) {
        let hasError = false;
        let errors: any[] = [];

        if (!record["CCC"]) {
            errors.push("CCC es obligatorio")
            hasError = true;
        }

        if (record["CCC"]) {
            const contract = await prismaClient.contrato.findFirst({
                where: {
                    CCC: `${record["CCC"]}`
                }
            })

            if (!contract) {
                errors.push("Contrato no encontrado")
                hasError = true;
            }
        }

        if (!record["CODIGO_INTERNO_FORMULARIO"]) {
            errors.push("CODIGO_INTERNO_FORMULARIO es obligatorio")
            hasError = true;
        }

        if (!record["SITUACION_FIRMA"]) {
            errors.push("SITUACION_FIRMA es obligatorio")
            hasError = true;
        }

        if (hasError) {
            ErrorLogs.push({
                ...record,
                errors
            })
            RegistrosError++;
            continue;
        } else {
            if ((record["CODIGO_INTERNO_FORMULARIO"] === 'SOL' || record["CODIGO_INTERNO_FORMULARIO"] === 'SEPA' || record["CODIGO_INTERNO_FORMULARIO"] === 'CP') && record["SITUACION_FIRMA"] === "Documento firmado") {
                const contract = await prismaClient.contrato.findFirst({
                    where: {
                        CCC: `${record["CCC"]}`
                    },
                    include: {
                        DocumentoContrato: {
                            include: {
                                IncidenciaDocumento: true,
                                MaestroDocumentos: {
                                    include: {
                                        FamiliaDocumento: true
                                    }
                                }
                            }

                        }
                    }
                })

                const conciliationType = await prismaClient.tipoConciliacion.findFirst({
                    where: {
                        Nombre: "Por Fichero Tableta (CCC)"
                    }
                })

                if (contract && conciliationType) {
                    for (const documentoContrato of contract.DocumentoContrato) {
                        if (documentoContrato.MaestroDocumentos.FamiliaDocumento.Codigo === 'SOL' || documentoContrato.MaestroDocumentos.FamiliaDocumento.Codigo === 'SEPA' || documentoContrato.MaestroDocumentos.FamiliaDocumento.Codigo === 'CP') {
                            for (const documentIncidence of documentoContrato.IncidenciaDocumento) {
                                await prismaClient.incidenciaDocumento.update({
                                    where: {
                                        IncidenciaId: documentIncidence.IncidenciaId
                                    },
                                    data: {
                                        Resuelta: true,
                                        Usuario: {
                                            connect: {
                                                UsuarioId: systemUser?.UsuarioId
                                            }
                                        }
                                    }
                                })
                            }
                            await prismaClient.documentoContrato.update({
                                where: {
                                    DocumentoId: documentoContrato.DocumentoId
                                },
                                data: {
                                    EstadoDoc: ContractDocumentStatusesEnum.CORRECT,
                                    FechaConciliacion: new Date(),
                                    Usuario: {
                                        connect: {
                                            UsuarioId: systemUser?.UsuarioId
                                        }
                                    }
                                }
                            })
                        }
                    }

                    const documentContracts = await prismaClient.documentoContrato.findMany({
                        where: {
                            ContratoId: contract.ContratoId
                        }
                    })

                    const hasIncidences = documentContracts.find(documentContract => documentContract.FechaConciliacion === null)

                    if (!hasIncidences) {
                        await prismaClient.contrato.update({
                            where: {
                                ContratoId: contract.ContratoId
                            },
                            data: {
                                TipoConciliacion: {
                                    connect: {
                                        TipoConciliacionId: conciliationType.TipoConciliacionId
                                    }
                                },
                                FechaConciliacion: new Date(),
                                ResultadoFDCON: record["RESULTADO"],
                                Usuario: {
                                    connect: {
                                        UsuarioId: systemUser?.UsuarioId
                                    }
                                }
                            }
                        })
                    }
                }
            }

            RegistrosOk++;
        }
    }

    return {
        ErrorLogs,
        RegistrosOk,
        RegistrosError
    }

}