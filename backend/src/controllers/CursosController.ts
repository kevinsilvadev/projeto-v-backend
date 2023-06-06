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

  async criarCursos(req: Request, res: Response): Promise<void> {
    try {
      const curso = Curso.fromMap(req.body);
      const pool = await sql.connect(config);
      const result = await pool
        .request()
        .query(`INSERT INTO CURSOS (urlPhoto, nome_cursos, descricao, ID_ALUNO) VALUES ('${curso.urlPhoto}', '${curso.nome_cursos}', '${curso.descricao}', ${curso.ID_ALUNO})`);

      res.status(201).send('Curso criado com sucesso');
    } catch (error) {
      res.status(500).send('Erro ao criar o curso');
      console.log(error);
    }
  }

  async deletarCursos(req: Request, res: Response): Promise<void> {
    try {
      const curso = Curso.fromMap(req.body);
      const pool = await sql.connect(config);
      const result = await pool
        .request()
        .query(`DELETE FROM CURSOS WHERE id_cursos='${curso.ID_CURSOS}`);
      res
        .status(201)
        .send('Curso atualizado com sucesso');
    } catch (error) {
      res.status(500).send('Erro ao atualizar o curso');
      console.log(error);
    }
  }

  async atualizarCursos(req: Request, res: Response): Promise<void> {
    try {
      const { id, campo, valor } = req.body; // Obtém os valores do corpo da requisição
  
      const pool = await sql.connect(config);
      const request = pool.request();
  
      let query = '';
      switch (campo) {
        case 'urlPhoto':
          query = `UPDATE CURSOS SET urlPhoto = @valor WHERE ID_CURSOS = @id`;
          break;
        case 'nome_cursos':
          query = `UPDATE CURSOS SET nome_cursos = @valor WHERE ID_CURSOS = @id`;
          break;
        case 'descricao':
          query = `UPDATE CURSOS SET descricao = @valor WHERE ID_CURSOS = @id`;
          break;
        case 'ID_ALUNO':
          query = `UPDATE CURSOS SET ID_ALUNO = @valor WHERE ID_CURSOS = @id`;
          break;
        default:
          throw new Error('Campo inválido');
      }
  
      request.input('id', id);
      request.input('valor', valor);
  
      const result = await request.query(query);
  
      res.status(201).send('Curso atualizado com sucesso');
    } catch (error) {
      res.status(500).send('Erro ao atualizar o curso');
      console.log(error);
    }
  }
}

export default CursosController;