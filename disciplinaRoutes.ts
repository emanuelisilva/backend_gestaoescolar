import { FastifyInstance } from 'fastify';
import {
  criarDisciplina,
  listarDisciplinas,
  buscarDisciplinaPorId,
  atualizarDisciplina,
  deletarDisciplina,
  Disciplina,
} from '../services/disciplinaService';

export async function disciplinaRoutes(fastify: FastifyInstance) {
  fastify.post('/disciplinas', async (request, reply) => {
    try {
      const body = request.body as Disciplina;

      if (!body.nome || !body.carga_horaria) {
        return reply.status(400).send({ error: 'Nome e carga horária são obrigatórios' });
      }

      const result = await criarDisciplina(body);
      return reply.status(201).send({ message: 'Disciplina criada com sucesso', id: (result as any).insertId });
    } catch (err) {
      return reply.status(500).send({ error: 'Erro ao criar disciplina' });
    }
  });

  fastify.get('/disciplinas', async (_, reply) => {
    try {
      const disciplinas = await listarDisciplinas();
      return reply.send(disciplinas);
    } catch (err) {
      return reply.status(500).send({ error: 'Erro ao listar disciplinas' });
    }
  });

  fastify.get('/disciplinas/:id', async (request, reply) => {
    try {
      const id = Number((request.params as any).id);
      if (isNaN(id)) return reply.status(400).send({ error: 'ID inválido' });

      const disciplina = await buscarDisciplinaPorId(id);
      if (!disciplina) return reply.status(404).send({ error: 'Disciplina não encontrada' });

      return reply.send(disciplina);
    } catch (err) {
      return reply.status(500).send({ error: 'Erro ao buscar disciplina' });
    }
  });

  fastify.put('/disciplinas/:id', async (request, reply) => {
    try {
      const id = Number((request.params as any).id);
      const body = request.body as Disciplina;
      if (isNaN(id)) return reply.status(400).send({ error: 'ID inválido' });

      if (!body.nome || !body.carga_horaria) {
        return reply.status(400).send({ error: 'Nome e carga horária são obrigatórios' });
      }

      await atualizarDisciplina(id, body);
      return reply.send({ message: 'Disciplina atualizada com sucesso' });
    } catch (err) {
      return reply.status(500).send({ error: 'Erro ao atualizar disciplina' });
    }
  });

  fastify.delete('/disciplinas/:id', async (request, reply) => {
    try {
      const id = Number((request.params as any).id);
      if (isNaN(id)) return reply.status(400).send({ error: 'ID inválido' });

      await deletarDisciplina(id);
      return reply.send({ message: 'Disciplina deletada com sucesso' });
    } catch (err) {
      return reply.status(500).send({ error: 'Erro ao deletar disciplina' });
    }
  });

  // Relatório com INNER JOIN (já implementado em listarDisciplinas)
  fastify.get('/disciplinas/relatorio', async (_, reply) => {
    try {
      const disciplinas = await listarDisciplinas();
      return reply.send(disciplinas);
    } catch (err) {
      return reply.status(500).send({ error: 'Erro ao gerar relatório' });
    }
  });
}
