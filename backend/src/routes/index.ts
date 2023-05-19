import { Router } from 'express'    
export const router = Router()
const sql = require('mssql')
import dotenv from 'dotenv'

dotenv.config()

const sqlConfig = {
    server: "ZULU18" + "\\" + "SQLEXPRESS",
    database: process.env.DATABASE_NAME,
    user: process.env.USER,
    password:process.env.PASSWORD,
    options: {
        encrypt:true,
        trustServerCertificate:true
    }
}



router.get('/alunos', async (req, res) => {
    try {
      const pool = await sql.connect(sqlConfig);
      const result = await pool.request().query('SELECT * FROM ALUNOS');
      res.send(result.recordset);
    } catch (error) {
      console.log(error);
      res.status(500).send('Erro ao buscar os dados do banco de dados.');
    }
  });

  
  router.get('/cursos', async (req, res) => {
    try {
      const pool = await sql.connect(sqlConfig);
      const result = await pool.request().query('SELECT * FROM CURSOS');
      res.send(result.recordset);
    } catch (error) {
      console.log(error);
      res.status(500).send('Erro ao buscar os dados do banco de dados.');
    }
  });