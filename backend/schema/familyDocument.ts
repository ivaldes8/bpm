import { z } from 'zod';

// Zod schema for creating a FamiliaDocumento
export const createFamiliaDocumentoSchema = z.object({
    Codigo: z.string(),
    Nombre: z.string(),
    Activo: z.boolean().optional(),
    FechaInicio: z.date().optional(),
    FechaBaja: z.date().optional(),
    FechaUltimaModif: z.date().optional(),
});
    
// Zod schema for updating a FamiliaDocumento
export const updateFamiliaDocumentoSchema = z.object({
    Codigo: z.string(),
    Nombre: z.string(),
    Activo: z.boolean().optional(),
    FechaInicio: z.date().optional(),
    FechaBaja: z.date().optional(),
    FechaUltimaModif: z.date().optional(),
});
