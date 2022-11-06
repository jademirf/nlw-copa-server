import Fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'

// ROUTES
import { pollRoutes } from './routes/poll'
import { userRoutes } from './routes/user'
import { guessRoutes } from './routes/guess'
import { gameRoutes } from './routes/game'
import { authRoutes } from './routes/auth'


async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  })

  await fastify.register(cors, {
    origin: true
  })

  await fastify.register(jwt, {
    // MODIFY LATTER TO USE .ENV FILE
    secret: 'process.env.JWT_SECRET_KEY'
  })
  
  await fastify.register(authRoutes)
  await fastify.register(gameRoutes)
  await fastify.register(guessRoutes)
  await fastify.register(pollRoutes)
  await fastify.register(userRoutes)

  await fastify.listen({ port: 3333, host: '0.0.0.0' })
}

bootstrap()