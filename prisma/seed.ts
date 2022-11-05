import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'Desmennyellysson Jerry',
      email: 'desmenny@mail.com',
      avatarUrl: 'https://github.com/jademirf.png'
    }
  })

  const pool = await prisma.pool.create({
    data: {
      title: 'Fake pool',
      code: 'BOL001',
      ownerId: user.id,
      participants: {
        create: {
          userId: user.id,
        }
      }
    }
  })
  
  await prisma.game.create({
    data: {
      date: '2022-11-05T15:40:00.240Z',
      firstTeamCountryCode: 'DE',
      secondTeamCountryCode: 'EN'
    }
  })
  
  await prisma.game.create({
    data: {
      date: '2022-11-06T15:40:00.240Z',
      firstTeamCountryCode: 'BR',
      secondTeamCountryCode: 'AR',

      guesses: {
        create: {
          firstTeamPoints: 3,
          secondTeamPoints: 2,

          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id,
              }
            }
          }
        }
      }
    }
  })
}

main()