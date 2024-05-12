import { z } from 'zod';

// Zod schema for creating a ContratoDocumento
export const createContratoDocumentoSchema = z.object({
    ContratoId: z.number(),
    DocId: z.number(),
});

// Zod schema for updating a ContratoDocumento
export const updateContratoDocumentoSchema = z.object({
    ContratoId: z.number(),
    DocId: z.number(),
    Estado: z.string().optional(),
});