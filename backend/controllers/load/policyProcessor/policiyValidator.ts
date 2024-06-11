import { prismaClient } from "../../../server";

export const policyValidator = async (record: any) => {
    const errors = [];
    let hasError = false;

    if (!record["COMPAÑÍA"]) {
        errors.push("Compañía es obligatorio")
        hasError = true;
    }

    if (record["COMPAÑÍA"]) {
        const company = await prismaClient.compania.findFirst({
            where: {
                Codigo: record["COMPAÑÍA"]
            }
        })

        if (!company) {
            errors.push("Compañía no encontrada")
            hasError = true;
        }
    }

    if (record["PRODUCTO"]) {
        const branch = await prismaClient.ramo.findFirst({
            where: {
                Codigo: record["PRODUCTO"]
            }
        })

        if (!branch) {
            errors.push("Ramo no encontrado")
            hasError = true;
        }
    }

    if (!record["PRODUCTO"]) {
        errors.push("Producto es obligatorio")
        hasError = true;
    }

    if (!record["FECHA DE ALTA"]) {
        errors.push("Fecha del alta es obligatorio")
        hasError = true;
    }

    if (!record["FECHA EFECTO"]) {
        errors.push("Fecha efecto es obligatorio")
        hasError = true;
    }

    if (!record["CCC"] && !record["CODIGO SOLICITUD"]) {
        errors.push("Tiene que especificar un CCC o un Código de solicitud")
        hasError = true;
    }

    if (!record["ANULADO SIN EFECTO"]) {
        errors.push("Anulado sin efecto es obligatorio")
        hasError = true;
    } else if (record["ANULADO CON EFECTO"] && record["ANULADO SIN EFECTO"] !== "S" && record["ANULADO SIN EFECTO"] !== "N") {
        errors.push("Anulado con efecto solo admite los valores 'S' o 'N'")
        hasError = true;
    }

    if (!record["ID_ASEGURADO"]) {
        errors.push("Id Asegurado es obligatorio")
        hasError = true;
    }

    if (!record["NOMBRE ASEGURADO"]) {
        errors.push("Nombre asegurado es obligatorio")
        hasError = true;
    }

    if (!record["EDAD ASEGURADO"]) {
        errors.push("Edad asegurado es obligatorio")
        hasError = true;
    }

    if (!record["CS CON RESPUESTAS AFIRMATIVAS"]) {
        errors.push("Cs co nrespuestas afirmativas es obligatorio")
        hasError = true;
    }

    if (!record["PROFESION"]) {
        errors.push("Profesión es obligatorio")
        hasError = true;
    }

    if (!record["DEPORTE"]) {
        errors.push("Deporte es obligatorio")
        hasError = true;
    }

    if (!record["ID_TOMADOR_PARTICIPE"]) {
        errors.push("Id del tomador es obligatorio")
        hasError = true;
    }

    if (!record["NOMBRE TOMADOR_PARTICIPE"]) {
        errors.push("Nombre del tomador es obligatorio")
        hasError = true;
    }

    if (!record["MEDIADOR"]) {
        errors.push("Mediador es obligatorio")
        hasError = true;
    }

    if (record["MEDIADOR"]) {
        const mediator = await prismaClient.mediador.findFirst({
            where: {
                Codigo: `${record["MEDIADOR"]}`
            }
        })

        if (!mediator) {
            errors.push("Mediador no encontrado")
            hasError = true;
        }
    }

    if (!record["OPERADOR"]) {
        errors.push("Operador es obligatorio")
        hasError = true;
    }

    if (record["INDICADOR FIRMA DIGITAL PRECON"] && record["INDICADOR FIRMA DIGITAL PRECON"] !== "SI" && record["INDICADOR FIRMA DIGITAL PRECON"] !== "NO") {
        errors.push("Indicador firma digital PRECON solo admite los valores 'SI' o 'NO'")
        hasError = true;
    }

    if (record["INDICADOR FIRMA DIGITAL CON"] && record["INDICADOR FIRMA DIGITAL CON"] !== "SI" && record["INDICADOR FIRMA DIGITAL CON"] !== "NO") {
        errors.push("Indicador firma digital CON solo admite los valores 'SI' o 'NO'")
        hasError = true;
    }

    if (record["REVISAR"] && record["REVISAR"] !== "SI" && record["REVISAR"] !== "NO") {
        errors.push("Revizar solo admite los valores 'SI' o 'NO'")
        hasError = true;
    }

    if (record["CONCILIAR"] && record["CONCILIAR"] !== "SI" && record["CONCILIAR"] !== "NO") {
        errors.push("Conciliar solo admite los valores 'SI' o 'NO'")
        hasError = true;
    }

    return {
        hasError,
        errors
    }
}