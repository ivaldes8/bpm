import { Request, Response } from "express";
import { prismaClient } from "../server";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import { BadRequestsException } from "../exceptions/bad-requests";
import { parseCsv, parseExcel } from "../utils/fileProcessors";
import { LogActionsEnum } from "../constants/LogActionsEnum";
import { LogCargaTypeEnum } from "../constants/LogCargaTypeEnum";
import { ContractDocumentStatusesEnum } from "../constants/ContractDocumentStatusesEnum";

export const getLoadLogs = async (req: Request, res: Response) => {
    const loadLogs = await prismaClient.logCarga.findMany({})

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

            const logAction = await prismaClient.logAccion.create({
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
                            LogId: logAction.LogId
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

const processPolicyData = async (records: any[], user: { UsuarioId: any; }) => {
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

        if (!record["COMPAÑÍA"]) {
            errors.push("Compañía es obligatorio")
            hasError = true;
        }

        if (record["COMPAÑÍA"]) {
            const company = await prismaClient.compania.findFirst({
                where: {
                    Codigo: record["COMPAÑÍA"]
                }
            })

            if (!company) {
                errors.push("Compañía no encontrada")
                hasError = true;
            }
        }

        if (record["PRODUCTO"]) {
            const branch = await prismaClient.ramo.findFirst({
                where: {
                    Codigo: record["PRODUCTO"]
                }
            })

            if (!branch) {
                errors.push("Ramo no encontrado")
                hasError = true;
            }
        }

        if (!record["PRODUCTO"]) {
            errors.push("Producto es obligatorio")
            hasError = true;
        }

        if (!record["FECHA DE ALTA"]) {
            errors.push("Fecha del alta es obligatorio")
            hasError = true;
        }

        if (!record["FECHA EFECTO"]) {
            errors.push("Fecha efecto es obligatorio")
            hasError = true;
        }

        if (!record["CCC"] && !record["CODIGO SOLICITUD"]) {
            errors.push("Tiene que especificar un CCC o un Código de solicitud")
            hasError = true;
        }

        if (!record["ANULADO SIN EFECTO"]) {
            errors.push("Anulado sin efecto es obligatorio")
            hasError = true;
        } else if (record["ANULADO CON EFECTO"] && record["ANULADO SIN EFECTO"] !== "S" && record["ANULADO SIN EFECTO"] !== "N") {
            errors.push("Anulado con efecto solo admite los valores 'S' o 'N'")
            hasError = true;
        }

        if (!record["ID_ASEGURADO"]) {
            errors.push("Id Asegurado es obligatorio")
            hasError = true;
        }

        if (!record["NOMBRE ASEGURADO"]) {
            errors.push("Nombre asegurado es obligatorio")
            hasError = true;
        }

        if (!record["EDAD ASEGURADO"]) {
            errors.push("Edad asegurado es obligatorio")
            hasError = true;
        }

        if (!record["CS CON RESPUESTAS AFIRMATIVAS"]) {
            errors.push("Cs co nrespuestas afirmativas es obligatorio")
            hasError = true;
        }

        if (!record["PROFESION"]) {
            errors.push("Profesión es obligatorio")
            hasError = true;
        }

        if (!record["DEPORTE"]) {
            errors.push("Deporte es obligatorio")
            hasError = true;
        }

        if (!record["ID_TOMADOR_PARTICIPE"]) {
            errors.push("Id del tomador es obligatorio")
            hasError = true;
        }

        if (!record["NOMBRE TOMADOR_PARTICIPE"]) {
            errors.push("Nombre del tomador es obligatorio")
            hasError = true;
        }

        if (!record["MEDIADOR"]) {
            errors.push("Mediador es obligatorio")
            hasError = true;
        }

        if (record["MEDIADOR"]) {
            const mediator = await prismaClient.mediador.findFirst({
                where: {
                    Codigo: `${record["MEDIADOR"]}`
                }
            })

            if (!mediator) {
                errors.push("Mediador no encontrado")
                hasError = true;
            }
        }

        if (!record["OPERADOR"]) {
            errors.push("Operador es obligatorio")
            hasError = true;
        }

        if (record["INDICADOR FIRMA DIGITAL PRECON"] && record["INDICADOR FIRMA DIGITAL PRECON"] !== "SI" && record["INDICADOR FIRMA DIGITAL PRECON"] !== "NO") {
            errors.push("Indicador firma digital PRECON solo admite los valores 'SI' o 'NO'")
            hasError = true;
        }

        if (record["INDICADOR FIRMA DIGITAL CON"] && record["INDICADOR FIRMA DIGITAL CON"] !== "SI" && record["INDICADOR FIRMA DIGITAL CON"] !== "NO") {
            errors.push("Indicador firma digital CON solo admite los valores 'SI' o 'NO'")
            hasError = true;
        }

        if (record["REVISAR"] && record["REVISAR"] !== "SI" && record["REVISAR"] !== "NO") {
            errors.push("Revizar solo admite los valores 'SI' o 'NO'")
            hasError = true;
        }

        if (record["CONCILIAR"] && record["CONCILIAR"] !== "SI" && record["CONCILIAR"] !== "NO") {
            errors.push("Conciliar solo admite los valores 'SI' o 'NO'")
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
            const company = await prismaClient.compania.findFirst({
                where: {
                    Codigo: record["COMPAÑÍA"]
                }
            })

            const branch = await prismaClient.ramo.findFirst({
                where: {
                    Codigo: record["PRODUCTO"]
                }
            })

            const mediator = await prismaClient.mediador.findFirst({
                where: {
                    Codigo: `${record["MEDIADOR"]}`
                }
            })

            const createdContract = await prismaClient.contrato.create({
                data: {
                    Compania: {
                        connect: {
                            CompaniaId: company?.CompaniaId
                        }
                    },
                    Ramo: {
                        connect: {
                            RamoId: branch?.RamoId
                        }
                    },
                    CanalMediador: {
                        connect: {
                            MediadorId: mediator?.MediadorId
                        }
                    },
                    Usuario: {
                        connect: {
                            UsuarioId: user.UsuarioId
                        }
                    },
                    FechaAltaSolicitud: new Date(record["FECHA DE ALTA"]),
                    CCC: record["CCC"] ?? null,
                    CodigoSolicitud: record["CODIGO SOLICITUD"] ?? null,
                    CodigoPoliza: record["POLIZA_CONTRATO"] ?? null,
                    FechaEfectoSolicitud: new Date(record["FECHA EFECTO"]),
                    AnuladoSE: record["ANULADO SIN EFECTO"] === 'S' ? true : false,
                    DNIAsegurado: record["ID_ASEGURADO"],
                    NombreAsegurado: record["NOMBRE ASEGURADO"],
                    FechaNacimientoAsegurado: record["EDAD ASEGURADO"] ? new Date(record["EDAD ASEGURADO"]) : null,
                    CSRespAfirm: record["CS CON RESPUESTAS AFIRMATIVAS"] === 'S' ? true : false,
                    ProfesionAsegurado: record["PROFESION"],
                    DeporteAsegurado: record["DEPORTE"],
                    DNITomador: record["ID_TOMADOR_PARTICIPE"],
                    NombreTomador: record["NOMBRE TOMADOR_PARTICIPE"],
                    FechaDNITomador: record["FECHA VALIDEZ IDENTIDAD TOMADOR"] ? new Date(record["FECHA VALIDEZ IDENTIDAD TOMADOR"]) : null,
                    IndicadorFDPRECON: record["INDICADOR FIRMA DIGITAL PRECON"] === 'SI' ? true : false,
                    TipoEnvioFDPRECON: record["TIPO ENVIO FIRMA DIGITAL PRECON"] ?? null,
                    ResultadoFDPRECON: record["RESULTADO FIRMA DIGITAL PRECON"] ?? null,
                    IndicadorFDCON: record["INDICADOR FIRMA DIGITAL CON"] === 'SI' ? true : false,
                    TipoEnvioFDCON: record["TIPO ENVIO FIRMA DIGITAL CON"] ?? null,
                    ResultadoFDCON: record["RESULTADO FIRMA DIGITAL CON"] ?? null,
                    Revisar: record["REVISAR"] === 'SI' ? true : false,
                    Conciliar: record["CONCILIAR"] === 'SI' ? true : false,
                    Suplemento: record["SUPLEMENTO"] && parseInt(record["SUPLEMENTO"]) === 1 ? true : false,
                },
                include: {
                    Ramo: {
                        include: {
                            RamoTipoOperacion: {
                                include: {
                                    RamoDocumento: {
                                        include: {
                                            MaestroDocumento: {
                                                include: {
                                                    FamiliaDocumento: true
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            })
            if (createdContract.ResultadoFDCON === 'Transacción aceptada' && createdContract?.IndicadorFDCON === true) {
                for (const ramoTipoOperacion of createdContract.Ramo.RamoTipoOperacion) {
                    for (const ramoDocumento of ramoTipoOperacion.RamoDocumento) {
                        await prismaClient.documentoContrato.create({
                            data: {
                                Contrato: {
                                    connect: {
                                        ContratoId: createdContract.ContratoId
                                    }
                                },
                                MaestroDocumentos: {
                                    connect: {
                                        TipoDocumentoId: ramoDocumento.MaestroDocumento.TipoDocumentoId
                                    }
                                },
                                Usuario: {
                                    connect: {
                                        UsuarioId: systemUser?.UsuarioId
                                    }
                                },
                                EstadoDoc: ContractDocumentStatusesEnum.CORRECT
                            }
                        })
                    }
                }

                const preLoadConciliation = await prismaClient.tipoConciliacion.findFirst({
                    where: {
                        Nombre: "Carga previa"
                    }
                })

                if (preLoadConciliation) {
                    await prismaClient.contrato.update({
                        where: {
                            ContratoId: createdContract.ContratoId
                        },
                        data: {
                            TipoConciliacion: {
                                connect: {
                                    TipoConciliacionId: preLoadConciliation?.TipoConciliacionId
                                }
                            }
                        }
                    })
                }
            } else if ((createdContract.ResultadoFDCON !== 'Transacción aceptada' && createdContract.IndicadorFDCON) || createdContract.IndicadorFDPRECON && createdContract.ResultadoFDPRECON === 'Transacción aceptada') {
                for (const ramoTipoOperacion of createdContract.Ramo.RamoTipoOperacion) {
                    for (const ramoDocumento of ramoTipoOperacion.RamoDocumento) {
                        if (ramoDocumento.Fase === 'PRECON') {
                            const documentoContrato = await prismaClient.documentoContrato.create({
                                data: {
                                    Contrato: {
                                        connect: {
                                            ContratoId: createdContract.ContratoId
                                        }
                                    },
                                    MaestroDocumentos: {
                                        connect: {
                                            TipoDocumentoId: ramoDocumento.MaestroDocumento.TipoDocumentoId
                                        }
                                    },
                                    Usuario: {
                                        connect: {
                                            UsuarioId: systemUser?.UsuarioId
                                        }
                                    },
                                    EstadoDoc: ContractDocumentStatusesEnum.CORRECT
                                }
                            })
                        }

                    }
                }

                const preLoadConciliation = await prismaClient.tipoConciliacion.findFirst({
                    where: {
                        Nombre: "Carga previa"
                    }
                })

                if (preLoadConciliation) {
                    await prismaClient.contrato.update({
                        where: {
                            ContratoId: createdContract.ContratoId
                        },
                        data: {
                            TipoConciliacion: {
                                connect: {
                                    TipoConciliacionId: preLoadConciliation?.TipoConciliacionId
                                }
                            }
                        }
                    })
                }
            } else {
                for (const ramoTipoOperacion of createdContract.Ramo.RamoTipoOperacion) {
                    for (const ramoDocumento of ramoTipoOperacion.RamoDocumento) {
                        const documentoContrato = await prismaClient.documentoContrato.create({
                            data: {
                                Contrato: {
                                    connect: {
                                        ContratoId: createdContract.ContratoId
                                    }
                                },
                                MaestroDocumentos: {
                                    connect: {
                                        TipoDocumentoId: ramoDocumento.MaestroDocumento.TipoDocumentoId
                                    }
                                },
                                Usuario: {
                                    connect: {
                                        UsuarioId: systemUser?.UsuarioId
                                    }
                                },
                                EstadoDoc: ContractDocumentStatusesEnum.NOT_PRESENT
                            }
                        })

                        const notFoundIncidence = await prismaClient.maestroIncidencias.findFirst({
                            where: {
                                DocAsociadoId: ramoDocumento.MaestroDocumento.FamiliaDocumento.FamiliaId,
                                Nombre: {
                                    contains: "no se ha recibido"
                                }
                            }
                        })

                        if (notFoundIncidence) {
                            await prismaClient.incidenciaDocumento.create({
                                data: {
                                    Usuario: {
                                        connect: {
                                            UsuarioId: systemUser?.UsuarioId
                                        }
                                    },
                                    DocumentoContrato: {
                                        connect: {
                                            DocumentoId: documentoContrato.DocumentoId
                                        }
                                    },
                                    MaestroIncidencias: {
                                        connect: {
                                            TipoIncidenciaId: notFoundIncidence.TipoIncidenciaId
                                        }
                                    }
                                }
                            })
                        }
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