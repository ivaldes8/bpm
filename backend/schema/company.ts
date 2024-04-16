import { z } from "zod"

export const CompanySchema = z.object({
    Nombre: z.string(),
    Codigo: z.string(),
    Descripcion: z.string(),
    Telefono: z.string(),
    CorreoComp: z.string(),
    ReclamarComp: z.boolean().optional(),
    CorreoSoporte: z.string(),
    ReclamarSoporte: z.boolean().optional(),
    Activo: z.boolean().optional(),
    FechaInicio: z.date(),
    FechaBaja: z.date().optional(),
    FechaUltimaModif: z.date(),
    Ramo: z.array(z.string()),
    Contrato: z.array(z.string()),
    Precios: z.array(z.string())
})