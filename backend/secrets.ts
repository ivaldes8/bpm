import dotenv from "dotenv"

dotenv.config({ path: '.env' })

export const PORT = process.env.PORT
export const DATABASE_URL = process.env.DATABASE_URL
export const JWT_SECRET = process.env.JWT_SECRET!
export const VERSION = process.env.VERSION
export const NODE_ENV = process.env.NODE_ENV
export const GOOGLE_EMAIL = process.env.GOOGLE_EMAIL
export const GOOGLE_EMAIL_PASSWORD = process.env.GOOGLE_EMAIL_PASSWORD