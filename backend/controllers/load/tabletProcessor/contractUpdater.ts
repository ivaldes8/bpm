import { Usuario } from "@prisma/client";
import { prismaClient } from "../../../server";
import { ContractDocumentStatusesEnum } from "../../../constants/ContractDocumentStatusesEnum";

const fetchContract = async (ccc: string) => {
    return prismaClient.contrato.findFirst({
        where: { CCC: ccc },
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
    });
};

const fetchConciliationType = async (name: string) => {
    return prismaClient.tipoConciliacion.findFirst({
        where: { Nombre: name }
    });
};

const resolveIncidences = async (documentoContrato: any, systemUser: Usuario) => {
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
        });
    }
};

const updateDocumentStatus = async (documentoContrato: any, systemUser: Usuario) => {
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
    });
};

const updateContractStatus = async (contractId: number, conciliationTypeId: number, record: any, systemUser: Usuario) => {
    await prismaClient.contrato.update({
        where: {
            ContratoId: contractId
        },
        data: {
            TipoConciliacion: {
                connect: {
                    TipoConciliacionId: conciliationTypeId
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
    });
};

const checkAndUpdateContractStatus = async (contract: any, conciliationType: any, record: any, systemUser: Usuario) => {
    const documentContracts = await prismaClient.documentoContrato.findMany({
        where: {
            ContratoId: contract.ContratoId
        }
    });

    const hasIncidences = documentContracts.some(documentContract => documentContract.FechaConciliacion === null);

    if (!hasIncidences) {
        await updateContractStatus(contract.ContratoId, conciliationType.TipoConciliacionId, record, systemUser);
    }
};

export const contractUpdater = async (record: any, systemUser: Usuario, user: { UsuarioId: any }) => {
    if ((record["CODIGO_INTERNO_FORMULARIO"] === 'SOL' || record["CODIGO_INTERNO_FORMULARIO"] === 'SEPA' || record["CODIGO_INTERNO_FORMULARIO"] === 'CP') && record["SITUACION_FIRMA"] === "Documento firmado") {
        const contract = await fetchContract(record["CCC"]);
        const conciliationType = await fetchConciliationType("Por Fichero Tableta (CCC)");

        if (contract && conciliationType) {
            for (const documentoContrato of contract.DocumentoContrato) {
                if (['SOL', 'SEPA', 'CP'].includes(documentoContrato.MaestroDocumentos.FamiliaDocumento.Codigo)) {
                    await resolveIncidences(documentoContrato, systemUser);
                    await updateDocumentStatus(documentoContrato, systemUser);
                }
            }

            await checkAndUpdateContractStatus(contract, conciliationType, record, systemUser);
        }
    }
};
