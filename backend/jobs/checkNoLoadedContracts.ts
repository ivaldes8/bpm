import { ContractDocumentStatusesEnum } from "../constants/ContractDocumentStatusesEnum";
import { prismaClient } from "../server";

export const checkNoLoadedContracts = async () => {
    const contracts = await prismaClient.contrato.findMany({
        include: {
            CanalMediador: true,
            DocumentoContrato: {
                include: {
                    MaestroDocumentos: true,
                    IncidenciaDocumento: {
                        include: {
                            MaestroIncidencias: true
                        }
                    }
                }
            }
        }
    });

    for (const contract of contracts) {
        const createdAt = contract.FechaAltaSolicitud ? contract.FechaAltaSolicitud : contract.FechaAltaContrato;

        if (createdAt) {
            const currentDate = new Date();
            const createdDate = new Date(createdAt);

            const diffInTime = currentDate.getTime() - createdDate.getTime();
            const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));

            if (diffInDays === 30 && contract.DocumentoContrato.length === 0) {
                await generateIncidences(contract.ContratoId, createdDate);
            }
        }
    }
}

const generateIncidences = async (contractId: number, createdDate: Date) => {
    const systemUser = await prismaClient.usuario.findFirst({
        where: {
            Codigo: '0001',
            Nombre: 'Sistema'
        }
    });

    const contract = await prismaClient.contrato.findFirst({
        where: { ContratoId: contractId },
        include: {
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
            DocumentoContrato: {
                include: {
                    IncidenciaDocumento: true
                }
            }
        }
    });

    if (contract) {
        const RamoTipoOperacionArray = contract.Ramo?.RamoTipoOperacion;
        const docList = [];

        for (const ramoTipoOperacion of RamoTipoOperacionArray) {
            for (const ramoDocumento of ramoTipoOperacion.RamoDocumento) {
                docList.push({
                    id: ramoDocumento.RamoDocId,
                });
            }
        }

        for (const doc of docList) {
            const createdContractDocument = await prismaClient.documentoContrato.create({
                data: {
                    Usuario: { connect: { UsuarioId: systemUser?.UsuarioId } },
                    Contrato: { connect: { ContratoId: contractId } },
                    MaestroDocumentos: { connect: { TipoDocumentoId: doc.id } },
                    EstadoDoc: ContractDocumentStatusesEnum.PENDING
                },
                include: { MaestroDocumentos: true }
            });

            const familiaDocId = createdContractDocument.MaestroDocumentos?.FamiliaId;

            if (familiaDocId) {
                const incidenceList = await prismaClient.maestroIncidencias.findMany({
                    where: { DocAsociadoId: familiaDocId }
                });

                const notFoundIncidence = incidenceList.find(incidence => incidence.Nombre.includes('no se ha recibido'));

                if (notFoundIncidence) {
                    await prismaClient.incidenciaDocumento.create({
                        data: {
                            Usuario: { connect: { UsuarioId: systemUser?.UsuarioId } },
                            DocumentoContrato: { connect: { DocumentoId: createdContractDocument.DocumentoId } },
                            MaestroIncidencias: { connect: { TipoIncidenciaId: notFoundIncidence.TipoIncidenciaId } }
                        }
                    });
                }
            }
        }

        await prismaClient.contrato.update({
            where: { ContratoId: contract.ContratoId },
            data: { FechaUltimaModif: createdDate }
        });
    }
}
