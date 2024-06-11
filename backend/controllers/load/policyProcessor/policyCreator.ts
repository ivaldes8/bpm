import { Usuario } from "@prisma/client"
import { prismaClient } from "../../../server"
import { ContractDocumentStatusesEnum } from "../../../constants/ContractDocumentStatusesEnum"

export const policyCreator = async (record: any, systemUser: Usuario, user: { UsuarioId: any }) => {
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
}