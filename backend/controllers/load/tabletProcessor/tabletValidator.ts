import { prismaClient } from "../../../server";

const validateRequiredFields = (record: any, errors: any[]) => {
    const requiredFields = [
        { field: "CCC", message: "CCC es obligatorio" },
        { field: "CODIGO_INTERNO_FORMULARIO", message: "CODIGO_INTERNO_FORMULARIO es obligatorio" },
        { field: "SITUACION_FIRMA", message: "SITUACION_FIRMA es obligatorio" }
    ];

    requiredFields.forEach(({ field, message }) => {
        if (!record[field]) {
            errors.push(message);
        }
    });
};

const validateCCC = async (record: any, errors: any[]) => {
    if (record["CCC"]) {
        const contract = await prismaClient.contrato.findFirst({
            where: {
                CCC: `${record["CCC"]}`
            }
        })
        if (!contract) {
            errors.push("Contrato no encontrado");
        }
    }
};

export const tabletValidator = async (record: any) => {
    const errors: any[] = [];
    let hasError = false;

    validateRequiredFields(record, errors);
    await validateCCC(record, errors);

    if (errors.length > 0) {
        hasError = true;
    }

    return {
        hasError,
        errors
    };
};