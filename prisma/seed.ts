import { PrismaClient } from '@prisma/client'
import rolSeeder from './seeders/rolSeeder'
import adminUserSeeder from './seeders/adminUserSeeder'
import systemUserSeeder from './seeders/systemUserSeeder'
import baseUsersSeeder from './seeders/baseUsersSeeder'
const prisma = new PrismaClient()
async function main() {
    await rolSeeder()

    await adminUserSeeder()

    await systemUserSeeder()

    await baseUsersSeeder()
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