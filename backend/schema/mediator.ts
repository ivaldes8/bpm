import { z } from "zod"

export const MediadorCreateSchema = z.object({
    Nombre: z.string(),
    Codigo: z.string(),
    Canal: z.string(),
    Zona: z.string(),
    Email: z.string().email(),
    Responsable: z.string().optional(),
    EmailResponsable: z.string().email().optional(),
    Responsable2: z.string().optional(),
    EmailResponsable2: z.string().email().optional(),
    Reclamar: z.boolean().optional(),
    Activo: z.boolean().optional(),
    FechaBaja: z.date().optional(),
    Observaciones: z.string().optional(),
})

export const MediadorUpdateSchema = z.object({
    Nombre: z.string(),
    Codigo: z.string().optional(),
    Canal: z.string().optional(),
    Zona: z.string().optional(),
    Email: z.string().email().optional(),
    Responsable: z.string().optional(),
    EmailResponsable: z.string().email().optional(),
    Responsable2: z.string().optional(),
    EmailResponsable2: z.string().email().optional(),
    Reclamar: z.boolean().optional(),
    Activo: z.boolean().optional(),
    FechaBaja: z.date().optional(),
    Observaciones: z.string().optional(),
})