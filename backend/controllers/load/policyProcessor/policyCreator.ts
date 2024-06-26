import { ContractDocumentStatusesEnum } from './../../../constants/ContractDocumentStatusesEnum';
import { Usuario } from "@prisma/client"
import { prismaClient } from "../../../server"
import { convertDate } from '../../../utils/utils';

const fetchCompany = async (code: string) => {
    let companyCode = code;

    if (code == 'UCV') {
        companyCode = 'UNI';
    } else if (code == 'AVP') {
        companyCode = 'SLS';
    }

    return prismaClient.compania.findFirst({
        where: { Nombre: companyCode }
    });
};

const fetchBranch = async (code: string) => {
    return prismaClient.ramo.findFirst({
        where: { Codigo: code }
    });
};

const fetchMediator = async (code: string) => {
    return prismaClient.mediador.findFirst({
        where: { Codigo: `${code}` }
    });
};

const createContract = async (record: any, company: any, branch: any, mediator: any, user: { UsuarioId: any }) => {
    return prismaClient.contrato.create({
        data: {
            Compania: { connect: { CompaniaId: company?.CompaniaId } },
            Ramo: { connect: { RamoId: branch?.RamoId } },
            CanalMediador: { connect: { MediadorId: mediator?.MediadorId } },
            Usuario: { connect: { UsuarioId: user.UsuarioId } },
            FechaAltaSolicitud: convertDate(record["FECHA DE ALTA"] ?? record["FECHA DE OPERACIÓN"]),
            CCC: record["CCC"] ?? null,
            CodigoSolicitud: record["CODIGO SOLICITUD"] ?? null,
            CodigoPoliza: record["POLIZA_CONTRATO"] ?? null,
            FechaEfectoSolicitud: convertDate(record["FECHA EFECTO"]),
            AnuladoSE: record["ANULADO SIN EFECTO"] === 'S',
            DNIAsegurado: record["ID_ASEGURADO"],
            NombreAsegurado: record["NOMBRE ASEGURADO"],
            FechaNacimientoAsegurado: record["EDAD ASEGURADO"] ? convertDate(record["EDAD ASEGURADO"]) : null,
            CSRespAfirm: record["CS CON RESPUESTAS AFIRMATIVAS"] === 'S' ? true : null,
            ProfesionAsegurado: record["PROFESION"] ?? null,
            DeporteAsegurado: record["DEPORTE"] ?? null,
            DNITomador: record["ID_TOMADOR_PARTICIPE"],
            NombreTomador: record["NOMBRE TOMADOR_PARTICIPE"],
            FechaDNITomador: record["FECHA VALIDEZ IDENTIDAD TOMADOR"] ? convertDate(record["FECHA VALIDEZ IDENTIDAD TOMADOR"]) : null,
            IndicadorFDPRECON: record["INDICADOR FIRMA DIGITAL PRECON"] === 'SI',
            TipoEnvioFDPRECON: record["TIPO ENVIO FIRMA DIGITAL PRECON"] ?? null,
            ResultadoFDPRECON: record["RESULTADO FIRMA DIGITAL PRECON"] ?? null,
            IndicadorFDCON: record["INDICADOR FIRMA DIGITAL CON"] === 'SI',
            TipoEnvioFDCON: record["TIPO ENVIO FIRMA DIGITAL CON"] ?? null,
            ResultadoFDCON: record["RESULTADO FIRMA DIGITAL CON"] ?? null,
            Revisar: record["REVISAR"] === 'SI',
            Conciliar: record["CONCILIAR"] === 'SI',
            Suplemento: record["SUPLEMENTO"] && parseInt(record["SUPLEMENTO"]) === 1
        },
        include: {
            Ramo: {
                include: {
                    RamoTipoOperacion: {
                        include: {
                            RamoDocumento: {
                                include: {
                                    MaestroDocumento: {
                                        include: { FamiliaDocumento: true }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    });
};

const createDocuments = async (createdContract: any, systemUser: Usuario, status: string, forPrecon: boolean) => {
    for (const ramoTipoOperacion of createdContract.Ramo.RamoTipoOperacion) {
        for (const ramoDocumento of ramoTipoOperacion.RamoDocumento) {
            if ((forPrecon && ramoDocumento.Fase === 'PRECON') || !forPrecon) {
                await prismaClient.documentoContrato.create({
                    data: {
                        Contrato: { connect: { ContratoId: createdContract.ContratoId } },
                        MaestroDocumentos: { connect: { TipoDocumentoId: ramoDocumento.MaestroDocumento.TipoDocumentoId } },
                        Usuario: { connect: { UsuarioId: systemUser?.UsuarioId } },
                        EstadoDoc: status
                    }
                });
            }
        }
    }
};

const handlePreLoadConciliation = async (createdContract: any) => {
    const preLoadConciliation = await prismaClient.tipoConciliacion.findFirst({
        where: { Nombre: "Carga previa" }
    });

    if (preLoadConciliation) {
        await prismaClient.contrato.update({
            where: { ContratoId: createdContract.ContratoId },
            data: {
                TipoConciliacion: {
                    connect: { TipoConciliacionId: preLoadConciliation?.TipoConciliacionId }
                }
            }
        });
    }
};

const handleIncidences = async (createdContract: any, systemUser: Usuario) => {
    for (const ramoTipoOperacion of createdContract.Ramo.RamoTipoOperacion) {
        for (const ramoDocumento of ramoTipoOperacion.RamoDocumento) {
            const documentoContrato = await prismaClient.documentoContrato.create({
                data: {
                    Contrato: { connect: { ContratoId: createdContract.ContratoId } },
                    MaestroDocumentos: { connect: { TipoDocumentoId: ramoDocumento.MaestroDocumento.TipoDocumentoId } },
                    Usuario: { connect: { UsuarioId: systemUser?.UsuarioId } },
                    EstadoDoc: ContractDocumentStatusesEnum.NOT_PRESENT
                }
            });

            const notFoundIncidence = await prismaClient.maestroIncidencias.findFirst({
                where: {
                    DocAsociadoId: ramoDocumento.MaestroDocumento.FamiliaDocumento.FamiliaId,
                    Nombre: { contains: "no se ha recibido" }
                }
            });

            if (notFoundIncidence) {
                await prismaClient.incidenciaDocumento.create({
                    data: {
                        Usuario: { connect: { UsuarioId: systemUser?.UsuarioId } },
                        DocumentoContrato: { connect: { DocumentoId: documentoContrato.DocumentoId } },
                        MaestroIncidencias: { connect: { TipoIncidenciaId: notFoundIncidence.TipoIncidenciaId } }
                    }
                });
            }
        }
    }
};

export const policyCreator = async (record: any, systemUser: Usuario, user: { UsuarioId: any }) => {
    const company = await fetchCompany(record["COMPAÑÍA"]);
    const branch = await fetchBranch(record["PRODUCTO"]);
    const mediator = await fetchMediator(record["MEDIADOR"]);

    const createdContract = await createContract(record, company, branch, mediator, user);
    if (createdContract.ResultadoFDCON === 'Transacción aceptada' && createdContract.IndicadorFDCON) {
        await createDocuments(createdContract, systemUser, ContractDocumentStatusesEnum.CORRECT, false);
        await handlePreLoadConciliation(createdContract);
    } else if ((createdContract.ResultadoFDCON !== 'Transacción aceptada' && createdContract.IndicadorFDCON) ||
        (createdContract.IndicadorFDPRECON && createdContract.ResultadoFDPRECON === 'Transacción aceptada')) {
        await createDocuments(createdContract, systemUser, ContractDocumentStatusesEnum.CORRECT, true);
        await handlePreLoadConciliation(createdContract);
    } else {
        await handleIncidences(createdContract, systemUser);
    }
};
