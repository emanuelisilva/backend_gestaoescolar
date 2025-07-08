import mysql from 'mysql2/promise';

export const db = mysql.createPool({
  host: 'localhost',      // ajuste para seu banco
  user: 'root',           // seu usuário MySQL
  password: '',           // sua senha
  database: 'gestao_escolar',  // nome do banco criado
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
