import { FastifyInstance } from 'fastify';
import {
  criarDisciplina,
  listarDisciplinas,
  atualizarDisciplina,
  deletarDisciplina,
  Disciplina,
} from '../services/disciplinaService';

export async function disciplinaRoutes(fastify: FastifyInstance) {
  // Listar todas as disciplinas
  fastify.get('/disciplinas', async (request, reply) => {
    const disciplinas = await listarDisciplinas();
    reply.send(disciplinas);
  });

  // Criar nova disciplina
  fastify.post('/disciplinas', async (request, reply) => {
    try {
      const novaDisciplina = request.body as Disciplina;
      const result = await criarDisciplina(novaDisciplina);
      reply.code(201).send(result);
    } catch (error: any) {
      reply.code(500).send({ erro: error.message });
    }
  });

  // Atualizar disciplina
  fastify.put('/disciplinas/:id', async (request, reply) => {
    try {
      const id = Number(request.params['id']);
      const dadosAtualizados = request.body as Disciplina;
      const result = await atualizarDisciplina(id, dadosAtualizados);
      reply.send(result);
    } catch (error: any) {
      reply.code(500).send({ erro: error.message });
    }
  });

  // Deletar disciplina
  fastify.delete('/disciplinas/:id', async (request, reply) => {
    try {
      const id = Number(request.params['id']);
      const result = await deletarDisciplina(id);
      reply.send(result);
    } catch (error: any) {
      reply.code(500).send({ erro: error.message });
    }
  });
}
