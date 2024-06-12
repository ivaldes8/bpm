import { prismaClient } from "../../../server";

const validateRequiredFields = (record: any, errors: any[]) => {
    const requiredFields = [
        { field: "NUM_POLIZA", message: "NUM_POLIZA es obligatorio" },
        { field: "RESULTADO", message: "RESULTADO es obligatorio" },
    ];

    requiredFields.forEach(({ field, message }) => {
        if (!record[field]) {
            errors.push(message);
        }
    });
};

const validateNumPolicy = async (record: any, errors: any[]) => {
    if (record["NUM_POLIZA"]) {
        const contract = await prismaClient.contrato.findFirst({
            where: {
                CodigoPoliza: `${record["NUM_POLIZA"]}`
            }
        })
        if (!contract) {
            errors.push("Contrato no encontrado")
        }
    }
};

export const digitalSignatureValidator = async (record: any) => {
    const errors: any[] = [];
    let hasError = false;

    validateRequiredFields(record, errors);
    await validateNumPolicy(record, errors);

    if (errors.length > 0) {
        hasError = true;
    }

    return {
        hasError,
        errors
    };
};