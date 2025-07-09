import mysql from 'mysql2/promise';

// Conexão com o banco de dados
export const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'gestao_escolar',
});
