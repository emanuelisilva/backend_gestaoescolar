import { db } from '../db';

export interface Disciplina {
  id?: number;
  nome: string;
  descricao?: string;
  carga_horaria: number;
  departamento_id?: number;
}

export async function criarDisciplina(disciplina: Disciplina) {
  const [result] = await db.execute(
    `INSERT INTO disciplinas (nome, descricao, carga_horaria, departamento_id) VALUES (?, ?, ?, ?)`,
    [disciplina.nome, disciplina.descricao || null, disciplina.carga_horaria, disciplina.departamento_id || null]
  );
  return result;
}

export async function listarDisciplinas() {
  const [rows] = await db.execute(
    `SELECT d.id, d.nome, d.descricao, d.carga_horaria, dep.nome as departamento
    FROM disciplinas d
    LEFT JOIN departamentos dep ON d.departamento_id = dep.id`
  );
  return rows;
}

export async function buscarDisciplinaPorId(id: number) {
  const [rows] = await db.execute(
    `SELECT * FROM disciplinas WHERE id = ?`,
    [id]
  );
  return (rows as any[])[0];
}

export async function atualizarDisciplina(id: number, disciplina: Disciplina) {
  const [result] = await db.execute(
    `UPDATE disciplinas SET nome = ?, descricao = ?, carga_horaria = ?, departamento_id = ? WHERE id = ?`,
    [disciplina.nome, disciplina.descricao || null, disciplina.carga_horaria, disciplina.departamento_id || null, id]
  );
  return result;
}

export async function deletarDisciplina(id: number) {
  const [result] = await db.execute(
    `DELETE FROM disciplinas WHERE id = ?`,
    [id]
  );
  return result;
}
