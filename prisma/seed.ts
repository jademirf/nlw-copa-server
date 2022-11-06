import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'Desmennyellysson Jerry',
      email: 'desmenny1@mail.com',
      avatarUrl: 'https://github.com/jademirf.png'
    }
  })

  const poll = await prisma.poll.create({
    data: {
      title: 'Fake poll',
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
              userId_pollId: {
                userId: user.id,
                pollId: poll.id,
              }
            }
          }
        }
      }
    }
  })
}

main()