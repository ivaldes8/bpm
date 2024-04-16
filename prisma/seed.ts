import { PrismaClient } from '@prisma/client'
import rolSeeder from './seeders/rolSeeder'
import adminUserSeeder from './seeders/adminUserSeeder'
const prisma = new PrismaClient()
async function main() {
    await rolSeeder()

    await adminUserSeeder()
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