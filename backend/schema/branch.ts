import { z } from 'zod';

// Zod schema for creating a Ramo
export const createRamoSchema = z.object({
    CompId: z.number(),
    Codigo: z.string(),
    Descripcion: z.string().optional(),
    Reclamar: z.boolean().optional(),
    Activo: z.boolean().optional(),
    Observaciones: z.string().optional(),
});

// Zod schema for updating a Ramo
export const updateRamoSchema = z.object({
    CompId: z.number().optional(),
    Codigo: z.string().optional(),
    Descripcion: z.string().optional(),
    Reclamar: z.boolean().optional(),
    Activo: z.boolean().optional(),
    FechaAlta: z.date().optional(),
    FechaBaja: z.date().optional(),
    FechaUltimaModif: z.date().optional(),
    Observaciones: z.string().optional(),
});