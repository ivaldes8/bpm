import { Request, Response } from "express";
import { prismaClient } from "../../server";
import { NotFoundException } from "../../exceptions/not-found";
import { ErrorCode } from "../../exceptions/root";
import { BadRequestsException } from "../../exceptions/bad-requests";
import { parseCsv, parseExcel } from "../../utils/fileProcessors";
import { LogActionsEnum } from "../../constants/LogActionsEnum";
import { LogCargaTypeEnum } from "../../constants/LogCargaTypeEnum";
import { processPolicyData } from "./policyProcessor/policyProcessor";
import { processDigitalSignatureData } from "./digitalSignatureProcessor/digitalSignatureProcessor";
import { processTabletData } from "./tabletProcessor/tabletProcessor";

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
        case "policy": {
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
        }
        case "digitalSignature": {
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
        }
        case "tablet": {
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
        }
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