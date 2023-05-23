import { Request, Response } from 'express';
import sql from 'mssql';
import { config } from '../bd';
import Curso from '../models/Cursos';

class CursosController {
  async listarCursos(req: Request, res: Response): Promise<void> {
    try {
      const pool = await sql.connect(config);
      const result = await pool.request().query('SELECT * FROM CURSOS');
  
      const alunos = result.recordset.map((curso: Curso) => {
        return {
            id: curso.ID_CURSOS,
            urlPhoto:curso.urlPhoto,
            nome_cursos: curso.nome_cursos,
            descricao: curso.descricao,
            id_aluno: curso.ID_ALUNO
        };
      });
      res.send(alunos);
    } catch (error) {
      console.log(error);
      res.status(500).send('Erro ao buscar os dados do banco de dados.');
    }
  }
}

export default CursosController;