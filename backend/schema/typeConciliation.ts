import { z } from 'zod';

// Zod schema for creating a type conciliation
export const createTypeConciliationSchema = z.object({
    Nombre: z.string(),
    Activo: z.boolean().optional(),
    FechaInicio: z.date().optional(),
    FechaBaja: z.date().optional(),
    FechaUltimaModif: z.date().optional(),
});
    
// Zod schema for updating a type conciliation
export const updateTypeConciliationSchema = z.object({
    Nombre: z.string(),
    Activo: z.boolean().optional(),
    FechaInicio: z.date().optional(),
    FechaBaja: z.date().optional(),
    FechaUltimaModif: z.date().optional(),
});
