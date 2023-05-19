import { Router } from 'express'    
export const router = Router()
const sql = require('mssql')

import { sqlConfig } from '../bd'

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