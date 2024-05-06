import { z } from 'zod';

// Zod schema for creating a ContratoObservacion
export const createContratoObservacionSchema = z.object({
    ContratoId: z.number(),
    Contenido: z.string(),
});