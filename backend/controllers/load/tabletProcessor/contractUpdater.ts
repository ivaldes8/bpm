import { Usuario } from "@prisma/client"
import { prismaClient } from "../../../server"
import { ContractDocumentStatusesEnum } from "../../../constants/ContractDocumentStatusesEnum"

export const contractUpdater = async (record: any, systemUser: Usuario, user: { UsuarioId: any }) => {
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
}