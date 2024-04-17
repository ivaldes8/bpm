import { z } from "zod"

export const CreateUSerSchema = z.object({
    Nombre: z.string(),
    Password: z.string().min(6),
    Codigo: z.string(),
    Activo: z.boolean().optional(),
    Rol: z.string().optional(),
    CaducidadPassword: z.string().optional()
})

export const UpdateUserSchema = z.object({
    Nombre: z.string(),
    Rol: z.string().optional(),
    Codigo: z.string().optional(),
    Activo: z.boolean().optional()
})

export const ChangePasswordSchema = z.object({
    oldPassword: z.string(),
    newPassword: z.string()
})