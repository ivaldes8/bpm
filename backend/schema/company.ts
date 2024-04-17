import { z } from "zod"

export const CompanyCreateSchema = z.object({
    Nombre: z.string(),
    Codigo: z.string(),
    Descripcion: z.string(),
    Telefono: z.string(),
    CorreoComp: z.string(),
    ReclamarComp: z.boolean().optional(),
    CorreoSoporte: z.string(),
    ReclamarSoporte: z.boolean().optional(),
    Activo: z.boolean().optional(),
    FechaInicio: z.date().optional(),
    FechaBaja: z.date().optional()
})

export const CompanyUpdateSchema = z.object({
    Nombre: z.string(),
    Codigo: z.string().optional(),
    Descripcion: z.string().optional(),
    Telefono: z.string(),
    CorreoComp: z.string(),
    ReclamarComp: z.boolean().optional(),
    CorreoSoporte: z.string(),
    ReclamarSoporte: z.boolean().optional(),
    Activo: z.boolean().optional(),
    FechaInicio: z.date().optional(),
    FechaBaja: z.date().optional()
})