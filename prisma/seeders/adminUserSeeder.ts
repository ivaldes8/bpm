import { PrismaClient } from "@prisma/client"
import { hashSync } from "bcrypt"

const adminUserSeeder = async () => {
    const prisma = new PrismaClient()

    const roleId = await prisma.rol.findFirst({
        where: {
            Nombre: 'ADMIN'
        }
    })

    if (!roleId) {
        throw new Error('Role ADMIN not found')
    }

    await prisma.usuario.upsert({
        where: { Codigo: '0000' },
        update: {},
        create: {
            Codigo: '0000',
            Nombre: 'Iván',
            Password: hashSync('96100709465', 10),
            Rol: {
                connect: roleId
            }
        }
    })

    console.log("USER ADMIN POPULATED")
}

export default adminUserSeeder