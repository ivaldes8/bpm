import { Usuario } from "@prisma/client";
import { prismaClient } from "../../../server";
import { tabletValidator } from "./tabletValidator";
import { contractUpdater } from "./contractUpdater";

export const processTabletData = async (records: any[], user: { UsuarioId: any; }) => {
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

        const { hasError: hasErr, errors: err } = await tabletValidator(record);

        if (hasErr) {
            hasError = true;
            errors = [...err, ...errors];
        }

        if (hasError) {
            ErrorLogs.push({
                ...record,
                errors
            })
            RegistrosError++;
        } else {
            await contractUpdater(record, systemUser as Usuario, user);

            RegistrosOk++;
        }
    }

    return {
        ErrorLogs,
        RegistrosOk,
        RegistrosError
    }

}