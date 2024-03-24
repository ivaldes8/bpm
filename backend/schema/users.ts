import { z } from "zod"

export const SignUpSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    code: z.string()
})

export const CreateUSerSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    code: z.string(),
    role: z.string()
})

export const UpdateUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    role: z.string().optional(),
    code: z.string(),
    active: z.boolean().optional()
})

