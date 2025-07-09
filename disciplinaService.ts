import { db } from '../config/db';

export interface Disciplina {
  id?: number;
  nome: string;
  descricao?: string;
  carga_horaria: number;
  departamento_id?: number;
}

// Criar nova disciplina
export async function criarDisciplina(disciplina: Disciplina) {
  const [result] = await db.execute(
    `INSERT INTO disciplinas (nome, descricao, carga_horaria, departamento_id)
     VALUES (?, ?, ?, ?)`,
    [
      disciplina.nome,
      disciplina.descricao || null,
      disciplina.carga_horaria,
      disciplina.departamento_id || null,
    ]
  );
  return result;
}

// Listar todas as disciplinas
export async function listarDisciplinas() {
  const [rows] = await db.execute('SELECT * FROM disciplinas');
  return rows;
}

// Atualizar disciplina
export async function atualizarDisciplina(id: number, disciplina: Disciplina) {
  const [result] = await db.execute(
    `UPDATE disciplinas
     SET nome = ?, descricao = ?, carga_horaria = ?, departamento_id = ?
     WHERE id = ?`,
    [
      disciplina.nome,
      disciplina.descricao || null,
      disciplina.carga_horaria,
      disciplina.departamento_id || null,
      id,
    ]
  );
  return result;
}

// Deletar disciplina
export async function deletarDisciplina(id: number) {
  const [result] = await db.execute('DELETE FROM disciplinas WHERE id = ?', [id]);
  return result;
}
