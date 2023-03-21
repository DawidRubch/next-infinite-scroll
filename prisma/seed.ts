import { Post, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


async function main() {

    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    const users = await (res.json() as Promise<{ name: string, email: string }[]>)

    const posts = await fetch('https://jsonplaceholder.typicode.com/posts')

    const postsData = await (posts.json() as Promise<{ title: string, body: string, userId: number }[]>)

    await prisma.user.createMany({
        data: users.map((user, index) => ({
            email: user.email,
            name: `${user.name.split(' ')[0] ?? ''}`,
            surname: `${user.name.split(' ')[1] ?? ''}`,
            imageURL: `https://picsum.photos/200/300?random=${index}`
        }))
    })

    await prisma.post.createMany({
        data: postsData.map((post, index) => ({
            title: post.title,
            body: post.body,
            userId: post.userId,
        }))
    }
    )
}


main().then(async () => {
    console.log('done')
    await prisma.$disconnect()
}).catch(async (err) => {
    console.error(err)
    await prisma.$disconnect()
    process.exit(1)
})

