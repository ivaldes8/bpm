import { prismaClient } from "../../../server";

const validateRequiredFields = (record: any, errors: any[]) => {
    const requiredFields = [
        { field: "COMPAÑÍA", message: "Compañía es obligatorio" },
        { field: "PRODUCTO", message: "Producto es obligatorio" },
        { field: "FECHA DE ALTA", message: "Fecha del alta es obligatorio" },
        { field: "FECHA EFECTO", message: "Fecha efecto es obligatorio" },
        { field: "CCC", message: "Tiene que especificar un CCC o un Código de solicitud", optional: "CODIGO SOLICITUD" },
        { field: "ANULADO SIN EFECTO", message: "Anulado sin efecto es obligatorio" },
        { field: "ID_ASEGURADO", message: "Id Asegurado es obligatorio" },
        { field: "NOMBRE ASEGURADO", message: "Nombre asegurado es obligatorio" },
        { field: "EDAD ASEGURADO", message: "Edad asegurado es obligatorio" },
        { field: "CS CON RESPUESTAS AFIRMATIVAS", message: "Cs con respuestas afirmativas es obligatorio" },
        { field: "PROFESION", message: "Profesión es obligatorio" },
        { field: "DEPORTE", message: "Deporte es obligatorio" },
        { field: "ID_TOMADOR_PARTICIPE", message: "Id del tomador es obligatorio" },
        { field: "NOMBRE TOMADOR_PARTICIPE", message: "Nombre del tomador es obligatorio" },
        { field: "MEDIADOR", message: "Mediador es obligatorio" },
        { field: "OPERADOR", message: "Operador es obligatorio" },
    ];

    requiredFields.forEach(({ field, message, optional }) => {
        if (!record[field] && (!optional || !record[optional])) {
            errors.push(message);
        }
    });
};

const validateOptionalFields = (record: any, errors: any[]) => {
    const optionalFields = [
        { field: "ANULADO SIN EFECTO", values: ["S", "N"], message: "Anulado con efecto solo admite los valores 'S' o 'N'" },
        { field: "INDICADOR FIRMA DIGITAL PRECON", values: ["SI", "NO"], message: "Indicador firma digital PRECON solo admite los valores 'SI' o 'NO'" },
        { field: "INDICADOR FIRMA DIGITAL CON", values: ["SI", "NO"], message: "Indicador firma digital CON solo admite los valores 'SI' o 'NO'" },
        { field: "REVISAR", values: ["SI", "NO"], message: "Revizar solo admite los valores 'SI' o 'NO'" },
        { field: "CONCILIAR", values: ["SI", "NO"], message: "Conciliar solo admite los valores 'SI' o 'NO'" },
    ];

    optionalFields.forEach(({ field, values, message }) => {
        if (record[field] && !values.includes(record[field])) {
            errors.push(message);
        }
    });
};

const validateCompany = async (record: any, errors: any[]) => {
    if (record["COMPAÑÍA"]) {
        const company = await prismaClient.compania.findFirst({
            where: { Codigo: `${record["COMPAÑÍA"]}` }
        });
        if (!company) {
            errors.push("Compañía no encontrada");
        }
    }
};

const validateBranch = async (record: any, errors: any[]) => {
    if (record["PRODUCTO"]) {
        const branch = await prismaClient.ramo.findFirst({
            where: { Codigo: `${record["PRODUCTO"]}` }
        });
        if (!branch) {
            errors.push("Ramo no encontrado");
        }
    }
};

const validateMediator = async (record: any, errors: any[]) => {
    if (record["MEDIADOR"]) {
        const mediator = await prismaClient.mediador.findFirst({
            where: { Codigo: `${record["MEDIADOR"]}` }
        });
        if (!mediator) {
            errors.push("Mediador no encontrado");
        }
    }
};
export const policyValidator = async (record: any) => {
    const errors: any[] = [];
    let hasError = false;

    validateRequiredFields(record, errors);
    validateOptionalFields(record, errors);
    await validateCompany(record, errors);
    await validateBranch(record, errors);
    await validateMediator(record, errors);

    if (errors.length > 0) {
        hasError = true;
    }

    return {
        hasError,
        errors
    };
};