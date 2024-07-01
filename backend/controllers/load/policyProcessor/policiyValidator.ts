import { prismaClient } from "../../../server";
import { convertDate } from "../../../utils/utils";

const validateField = (record: any, field: string, condition: boolean, message: string, errors: any[]) => {
    if (condition) {
        errors.push(message);
    }
};

const validateRequiredFields = (record: any, errors: any[]) => {
    const requiredFields = [
        { field: "COMPAÑÍA", message: "Compañía es obligatorio" },
        { field: "PRODUCTO", message: "Producto es obligatorio" },
        { field: "FECHA DE OPERACIÓN", message: "Fecha del alta es obligatorio" },
        { field: "FECHA EFECTO", message: "Fecha efecto es obligatorio" },
        { field: "CCC", message: "Tiene que especificar un CCC o un Código de solicitud", optional: "CODIGO SOLICITUD" },
        { field: "ANULADO SIN EFECTO", message: "Anulado sin efecto es obligatorio" },
        { field: "ID_ASEGURADO", message: "Id Asegurado es obligatorio" },
        { field: "NOMBRE ASEGURADO", message: "Nombre asegurado es obligatorio" },
        { field: "EDAD ASEGURADO", message: "Edad asegurado es obligatorio" },
        { field: "ID_TOMADOR_PARTICIPE", message: "Id del tomador es obligatorio" },
        { field: "NOMBRE TOMADOR_PARTICIPE", message: "Nombre del tomador es obligatorio" },
        { field: "MEDIADOR", message: "Mediador es obligatorio" },
        { field: "OPERADOR", message: "Operador es obligatorio" },
    ];

    requiredFields.forEach(({ field, message, optional }) => {
        validateField(record, field, !record[field] && (!optional || !record[optional]), message, errors);
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
        validateField(record, field, record[field] && !values.includes(record[field]), message, errors);
    });
};

const validateDates = async (record: any, errors: any[]) => {
    const dateFields = [
        { field: "FECHA DE OPERACIÓN", message: "FECHA DE OPERACIÓN fecha no válida" },
        { field: "FECHA EFECTO", message: "FECHA EFECTO fecha no válida" },
        { field: "FECHA DE ALTA", message: "FECHA DE ALTA fecha no válida" },
        { field: "EDAD ASEGURADO", message: "EDAD ASEGURADO fecha no válida" },
        { field: "FECHA VALIDEZ IDENTIDAD TOMADOR", message: "FECHA VALIDEZ IDENTIDAD TOMADOR fecha no válida" },
    ];

    dateFields.forEach(({ field, message }) => {
        validateField(record, field, record[field] && isNaN(convertDate(record[field]).getTime()), message, errors);
    });
};

const validateCompany = async (record: any, errors: any[]) => {
    if (record["COMPAÑÍA"]) {
        let companyCode = record["COMPAÑÍA"];

        if (record["COMPAÑÍA"] == 'UCV') {
            companyCode = 'UNI';
        } else if (record["COMPAÑÍA"] == 'AVP') {
            companyCode = 'SLS';
        }

        const company = await prismaClient.compania.findFirst({
            where: { Nombre: `${companyCode}` }
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
    validateDates(record, errors);
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