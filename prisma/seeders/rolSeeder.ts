import { PrismaClient } from "@prisma/client"

const rolSeeder = async () => {
    const prisma = new PrismaClient()

    await prisma.rol.upsert({
        where: { Nombre: 'ADMIN' },
        update: {},
        create: {
            Nombre: 'ADMIN'
        }
    })

    await prisma.rol.upsert({
        where: { Nombre: 'MONITOR' },
        update: {},
        create: {
            Nombre: 'MONITOR'
        }
    })

    await prisma.rol.upsert({
        where: { Nombre: 'BASE' },
        update: {},
        create: {
            Nombre: 'BASE'
        }
    })

    console.log("ROLES POPULATED")
}

export default rolSeeder