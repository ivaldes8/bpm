import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
    const roleAdmin = await prisma.role.create({
        data: {
            name: 'ADMIN',
        }
    })
    const roleUser = await prisma.role.create({
        data: {
            name: 'USER',
        }
    })
    console.log({ roleAdmin, roleUser })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })