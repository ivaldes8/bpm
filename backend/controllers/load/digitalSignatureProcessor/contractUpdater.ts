import { Usuario } from "@prisma/client"
import { prismaClient } from "../../../server"
import { ContractDocumentStatusesEnum } from "../../../constants/ContractDocumentStatusesEnum"

export const contractUpdater = async (record: any, systemUser: Usuario, user: { UsuarioId: any }) => {

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
}