import Fastify from 'fastify';
import cors from '@fastify/cors';
import { disciplinaRoutes } from './routes/disciplinaRoutes';

const fastify = Fastify({ logger: true });

fastify.register(cors, {
  origin: '*',
});

fastify.register(disciplinaRoutes);

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log('Servidor rodando em http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
