import Fastify from 'fastify'
import cors from '@fastify/cors'
import { z } from 'zod'
import ShortUniqueId from 'short-unique-id'
import { prisma } from './lib/prisma'


async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  })

  await fastify.register(cors, {
    origin: true
  })

  fastify.get('/users/count', async () => {
    const count = await prisma.user.count()
    return { count }
  })

  fastify.get('/guesses/count', async () => {
    const count = await prisma.guess.count()
    return { count }
  })

  fastify.post('/polls', async (request, reply) => {
    const createPollBody = z.object({
      title: z.string(),
    })

    const { title } = createPollBody.parse(request.body)
    const generateId = new ShortUniqueId({length: 6})
    const code = String(generateId()).toUpperCase()
    
    await prisma.poll.create({
      data: {
        title,
        code
      }
    })


    return reply.status(201).send({code})
  })

  await fastify.listen({ port: 3333, host: '0.0.0.0' })
}

bootstrap()