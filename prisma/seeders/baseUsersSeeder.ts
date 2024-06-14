import { PrismaClient } from "@prisma/client"
import { hashSync } from "bcrypt"

const baseUsersSeeder = async () => {
    const prisma = new PrismaClient()

    const roleAdmin = await prisma.rol.findFirst({
        where: {
            Nombre: 'ADMIN'
        }
    })

    if (!roleAdmin) {
        throw new Error('Role ADMIN not found')
    }

    const roleMonitor = await prisma.rol.findFirst({
        where: {
            Nombre: 'MONITOR'
        }
    })

    if (!roleMonitor) {
        throw new Error('Role MONITOR not found')
    }

    const roleBase = await prisma.rol.findFirst({
        where: {
            Nombre: 'BASE'
        }
    })

    if (!roleBase) {
        throw new Error('Role BASE not found')
    }

    await prisma.usuario.upsert({
        where: { Codigo: 'admin' },
        update: {},
        create: {
            Codigo: 'admin',
            Nombre: 'admin',
            Password: hashSync('admin', 10),
            Rol: {
                connect: roleAdmin
            }
        }
    })

    await prisma.usuario.upsert({
        where: { Codigo: 'lmunoz' },
        update: {},
        create: {
            Codigo: 'lmunoz',
            Nombre: 'Luis Muñoz',
            Password: hashSync('lmunoz', 10),
            Rol: {
                connect: roleAdmin
            }
        }
    })

    await prisma.usuario.upsert({
        where: { Codigo: 'jlora' },
        update: {},
        create: {
            Codigo: 'jlora',
            Nombre: 'Juan Lora',
            Password: hashSync('jlora', 10),
            Rol: {
                connect: roleMonitor
            }
        }
    })

    await prisma.usuario.upsert({
        where: { Codigo: 'base' },
        update: {},
        create: {
            Codigo: 'base',
            Nombre: 'Usuario Base',
            Password: hashSync('base', 10),
            Rol: {
                connect: roleBase
            }
        }
    })

    console.log("BASE USERS POPULATED")
}

export default baseUsersSeeder