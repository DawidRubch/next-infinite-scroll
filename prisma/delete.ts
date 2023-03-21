
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

async function main() {
    prisma.$executeRaw`DROP TABLE IF EXISTS "User";`

    await prisma.$disconnect()
}


main().then(async () => {
    console.log('done')
    await prisma.$disconnect()
}).catch(async (err) => {
    console.error(err)
    await prisma.$disconnect()
    process.exit(1)
})